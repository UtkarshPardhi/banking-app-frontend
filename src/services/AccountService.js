// import axios from "axios";
 
// const BASE_URL = "http://localhost:8080/api/accounts";

// class AccountService {

//     // getAllAccounts() {
//     //     return axios.get(BASE_URL);
//     // }

//     // createAccount(account) {
//     //     return axios.post(BASE_URL, account);
//     // }

//     // deleteAccount(id) {
//     //     return axios.delete(`${BASE_URL}/${id}`);
//     // }

//     // deposit(id, amount) {
//     //     return axios.put(`${BASE_URL}/${id}/deposit`, { amount });
//     // }

//     // withdraw(id, amount) {
//     //     return axios.put(`${BASE_URL}/${id}/withdraw`, { amount })
//     // }

//     // getTransactions(accountId) {
//     //     return axios.get(`${BASE_URL}/${accountId}/transactions`);
//     // }
    
//     getAuthHeader() {
//         const token = localStorage.getItem("token");
//         return {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         };
//     }

//     getAllAccounts() {
//          return axios.get(BASE_URL, this.getAuthHeader());
//      }

//      createAccount(account) {
//          return axios.post(BASE_URL, account, this.getAuthHeader());
//      }

//      deleteAccount(id) {
//          return axios.delete(`${BASE_URL}/${id}`, this.getAuthHeader);
//      }

//      deposit(id, amount) {
//          return axios.put(`${BASE_URL}/${id}/deposit`, { amount }, this.getAuthHeader());
//      }

//      withdraw(id, amount) {
//          return axios.put(`${BASE_URL}/${id}/withdraw`, { amount }, this.getAuthHeader());
//      }

//      getTransactions(accountId) {
//          return axios.get(`${BASE_URL}/${accountId}/transactions`, this.getAuthHeader());
//      }
// }

// export default new AccountService();
// old Account service code

import axios from "axios";

const BASE_URL = "http://localhost:8080/api/accounts";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Session expired. Logging out...");

      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

class AccountService {

  getAllAccounts() {
    return axios.get(BASE_URL, getAuthHeaders());
  }

  createAccount(account) {
    return axios.post(BASE_URL, account, getAuthHeaders());
  }

  deposit(id, amount) {
    return axios.put(
        `${BASE_URL}/${id}/deposit`,
        { amount: amount },
         getAuthHeaders()
        );
  }

  withdraw(id, amount) {
    return axios.put(
    `${BASE_URL}/${id}/withdraw`,
     { amount: amount},
     getAuthHeaders()
    );
  }

  deleteAccount(id) {
    return axios.delete(`${BASE_URL}/${id}`, getAuthHeaders());
  }

  getTransactions(id) {
    return axios.get(`${BASE_URL}/${id}/transactions`, getAuthHeaders());
  }

  getPDF(id, filter) {
  return axios.get(`${BASE_URL}/${id}/transactions/pdf`, {
    ...getAuthHeaders(),
    params: { filter },
    responseType: "blob",
  });
}

getCSV(id, filter) {
  return axios.get(`${BASE_URL}/${id}/transactions/csv`, {
    ...getAuthHeaders(),
    params: { filter },
    responseType: "blob",
  });
}

getExcel(id, filter) {
  return axios.get(`${BASE_URL}/${id}/transactions/excel`, {
    ...getAuthHeaders(),
    params: { filter },
    responseType: "blob",
  });
}

getStats(id) {
  return axios.get(`${BASE_URL}/${id}/stats`, getAuthHeaders());
}

}

export default new AccountService();