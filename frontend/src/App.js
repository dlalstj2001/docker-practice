import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 사용자 목록 불러오기
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/users');
      setUsers(response.data);
      setError('');
    } catch (err) {
      setError('사용자 목록을 불러오는데 실패했습니다.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // 사용자 추가
  const addUser = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      setError('이름과 이메일을 모두 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/users', newUser);
      setNewUser({ name: '', email: '' });
      setSuccess('사용자가 성공적으로 추가되었습니다!');
      setError('');
      fetchUsers(); // 목록 새로고침
    } catch (err) {
      if (err.response?.status === 400) {
        setError('이미 존재하는 이메일입니다.');
      } else {
        setError('사용자 추가에 실패했습니다.');
      }
      setSuccess('');
      console.error('Error adding user:', err);
    } finally {
      setLoading(false);
    }
  };

  // 사용자 삭제 (실제 API 호출)
  const removeUser = async (userId) => {
    try {
      await axios.delete(`/users/${userId}`);
      setSuccess('사용자가 성공적으로 삭제되었습니다.');
      setError('');
      fetchUsers(); // 목록 새로고침
    } catch (err) {
      setError('사용자 삭제에 실패했습니다.');
      setSuccess('');
      console.error('Error deleting user:', err);
    }
  };

  // 컴포넌트 마운트 시 사용자 목록 불러오기
  useEffect(() => {
    fetchUsers();
  }, []);

  // 성공/에러 메시지 자동 사라지기
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏗️ 사용자 관리 시스템</h1>
        <p>Docker + React + Flask + MySQL + Redis</p>
      </header>

      <main className="container">
        {/* 알림 메시지 */}
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {/* 사용자 추가 폼 */}
        <section className="add-user-section">
          <h2>👤 새 사용자 추가</h2>
          <form onSubmit={addUser} className="user-form">
            <div className="form-group">
              <label htmlFor="name">이름:</label>
              <input
                type="text"
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="사용자 이름을 입력하세요"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">이메일:</label>
              <input
                type="email"
                id="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="이메일 주소를 입력하세요"
                disabled={loading}
              />
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? '추가 중...' : '사용자 추가'}
            </button>
          </form>
        </section>

        {/* 사용자 목록 */}
        <section className="users-section">
          <div className="section-header">
            <h2>👥 사용자 목록 ({users.length}명)</h2>
            <button onClick={fetchUsers} disabled={loading} className="btn btn-secondary">
              {loading ? '새로고침 중...' : '🔄 새로고침'}
            </button>
          </div>

          {loading && users.length === 0 ? (
            <div className="loading">데이터를 불러오는 중...</div>
          ) : users.length === 0 ? (
            <div className="no-users">
              <p>아직 등록된 사용자가 없습니다.</p>
              <p>위 폼을 사용해서 첫 번째 사용자를 추가해보세요!</p>
            </div>
          ) : (
            <div className="users-grid">
              {users.map((user) => (
                <div key={user.id} className="user-card">
                  <div className="user-info">
                    <h3>{user.name}</h3>
                    <p className="email">{user.email}</p>
                    <p className="date">
                      가입일: {new Date(user.created_at).toLocaleDateString('ko-KR')}
                    </p>
                    <p className="id">ID: {user.id}</p>
                  </div>
                  <div className="user-actions">
                    <button 
                      onClick={() => removeUser(user.id)}
                      className="btn btn-danger"
                      title="데이터베이스에서 완전 삭제"
                    >
                      🗑️ 삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="App-footer">
        <p>Mini Stack 실습 프로젝트 - Docker Compose로 구성된 풀스택 애플리케이션</p>
      </footer>
    </div>
  );
}

export default App;