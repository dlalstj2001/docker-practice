from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
import time
import json
import redis
from datetime import datetime

app = Flask(__name__)
CORS(app)  # 모든 도메인에서의 요청 허용

# JSON 응답에서 한글이 제대로 표시되도록 설정
app.config['JSON_AS_ASCII'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.json.ensure_ascii = False

# Redis 설정
redis_client = redis.Redis(host='redis', port=6379, decode_responses=True)

# 데이터베이스 설정
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///local.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'pool_pre_ping': True,
    'pool_recycle': 300,
    'connect_args': {"charset": "utf8mb4"}
}

db = SQLAlchemy(app)

# 간단한 User 모델
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'created_at': self.created_at.isoformat()
        }

@app.route('/')
def home():
    return jsonify({
        'message': 'Welcome to FRMR Stack API!',
        'version': '1.0.0',
        'endpoints': {
            'GET /': 'API Information',
            'GET /health': 'Health Check',
            'GET /users': 'Get All Users',
            'POST /users': 'Create New User',
            'GET /users/<id>': 'Get User by ID',
            'DELETE /users/<id>': 'Delete User'
        }
    })

@app.route('/health')
def health_check():
    try:
        # 데이터베이스 연결 테스트
        from sqlalchemy import text
        db.session.execute(text('SELECT 1'))
        db_status = 'healthy'
    except Exception as e:
        db_status = f'error: {str(e)}'
    
    return jsonify({
        'status': 'running',
        'database': db_status,
        'timestamp': datetime.utcnow().isoformat()
    })

@app.route('/users', methods=['GET'])
def get_users():
    # Redis 캐시에서 먼저 확인
    try:
        cached_users = redis_client.get('users_list')
        if cached_users:
            return jsonify(json.loads(cached_users))
    except:
        pass  # Redis 연결 실패 시 DB에서 가져옴
    
    # DB에서 가져오기
    users = User.query.all()
    users_data = [user.to_dict() for user in users]
    
    # Redis에 5분간 캐싱
    try:
        redis_client.setex('users_list', 300, json.dumps(users_data))
    except:
        pass  # Redis 저장 실패해도 계속 진행
    
    return jsonify(users_data)

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    
    if not data or 'name' not in data or 'email' not in data:
        return jsonify({'error': 'Name and email are required'}), 400
    
    # 이메일 중복 확인
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400
    
    user = User(name=data['name'], email=data['email'])
    db.session.add(user)
    db.session.commit()
    
    # 캐시 무효화
    try:
        redis_client.delete('users_list')
    except:
        pass
    
    return jsonify(user.to_dict()), 201

@app.route('/users/<int:user_id>')
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    
    # 캐시 무효화
    try:
        redis_client.delete('users_list')
    except:
        pass
    
    return jsonify({
        'message': f'User {user.name} deleted successfully',
        'deleted_user': user.to_dict()
    }), 200

@app.after_request
def after_request(response):
    # JSON 응답의 경우 UTF-8 인코딩 명시
    if response.mimetype == 'application/json':
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
    return response

def create_tables():
    """데이터베이스 테이블 생성"""
    max_retries = 30
    retry_count = 0
    
    while retry_count < max_retries:
        try:
            with app.app_context():
                db.create_all()
                print("데이터베이스 테이블이 생성되었습니다.")
                return
        except Exception as e:
            retry_count += 1
            print(f"데이터베이스 연결 시도 {retry_count}/{max_retries} 실패: {e}")
            if retry_count >= max_retries:
                print("데이터베이스 연결에 실패했습니다.")
                raise e
            time.sleep(2)

if __name__ == '__main__':
    create_tables()
    app.run(host='0.0.0.0', port=5000, debug=True)