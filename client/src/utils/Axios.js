import axios from "axios";

const calls = {
  getAllUser: function() {
    return axios.get("/users/all")
      .then(function(results) {
        console.log(results);
        return results;
      });
  },
  logSuccess: function(){
    console.log("trying to redirect...")
    return axios.get("/menu")
    .then(function(result) {
      return result;
    })
  },
  logUser: function(user, password){
    console.log("attemping to login")
    console.log("Axios user and pass " + user + " " + password)
    return axios.post(`/login`, {
      user: user,
      password: password
    })
    .then(function(response){
      console.log("user result", response);
      return response;
    })
    .catch(function(err){
      console.log(err)
    });
  },
  userSave: function(user, password, nickname) {
    // var newUser = { user: user, password: password};
    console.log('User is ', user + " Password is " + password + " Nickname is " + nickname)
    return axios.post(`/users/save`, 
      {
        user: user, 
        password: password,
        nickname: nickname
      })
        .then(response => {
        console.log(response)
        if (!response.data.errmsg) {
          console.log('youre good')
          this.setState({
            redirectTo: '/login'
          })
        } else {
          console.log('duplicate')
        }
      })
  }
};

export default calls;