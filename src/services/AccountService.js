import axios from "axios";
 
const BASE_URL = "http://localhost:8080/api/accounts";

class AccountService {

    getAllAccounts() {
        return axios.get(BASE_URL);
    }

    createAccount(account) {
        return axios.post(BASE_URL, account);
    }

    deleteAccount(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }

    deposit(id, amount) {
        return axios.put(`${BASE_URL}/${id}/deposit`, { amount });
    }

    withdraw(id, amount) {
        return axios.put(`${BASE_URL}/${id}/withdraw`, { amount })
    }

    getTransactions(accountId) {
        return axios.get(`${BASE_URL}/${accountId}/transactions`);
    }
    
}

export default new AccountService();