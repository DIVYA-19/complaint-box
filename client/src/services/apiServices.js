import TokenServices from "./tokenServices";

class APIServices {
  async getComplaints() {
    var complaints;
    await fetch(process.env.API_URL + "api/complaints", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        complaints = res;
      });
    return complaints;
  }

  async getAttributeDistinctValues(attribute) {
    var attributeDistinctValues;
    await fetch(
      process.env.API_URL +
        "api/complaints/attribute/" +
        attribute +
        "/distinct"
    )
      .then((res) => res.json())
      .then((res) => {
        attributeDistinctValues = res;
      });
    return attributeDistinctValues;
  }

  async signin(data) {
    var user;
    await fetch(process.env.API_URL + "api/auth/signin/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        user = res.user;
      });

    return user;
  }

  async signup(data) {
    var userCreated = false;
    fetch(process.env.API_URL + "api/auth/signup/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200) {
          userCreated = true;
        }
      });

    return userCreated;
  }

  async createNewComplaint(data) {
    var newComplaintCreated = false;
    var user = TokenServices.getUser();
    await fetch(process.env.API_URL + "api/complaint", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log(res);
      if (res.status !== 401) {
        newComplaintCreated = true;
      }
    });
    return newComplaintCreated;
  }

  async searchComplaints(string) {
    var complaints;
    await fetch(process.env.API_URL + "api/complaints/search/" + string)
      .then((res) => res.json())
      .then((res) => {
        complaints = res;
      });
    
      return complaints;
  }
}

export default new APIServices();
