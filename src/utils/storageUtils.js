import store from 'store';
const storageUtils = {
    /**
     * 把用户信息存储到本地
     * @param {JSON} user 后端返回的用户 id
     */
    saveUser(username, token, role) {
        store.set('username', username);
        store.set('token', token);
        store.set('role', role);
    },
    /**
     * 使用原有的token像后端申请新的token
     * @param {string} token 原有用户登陆使用的token
     */
    updateToken(token){
        store.set('token', token);
    },
    /**
     * 从本地存储中获取用户 id
     */
    getUser() {
        const username = store.get('username');
        const role = store.get('role');
        const token = store.get('token');
        return {username: username, role: role, token: token};
    },
    removeUser() {
        store.clearAll();
    },
};

export default storageUtils;

