class API {
  constructor() {
    this.url =
      "https://script.google.com/macros/s/AKfycbyb2IZKzd9dUSSWsTdigATxKCpLhnM3O0brExWNJe38P2mnz-ld/exec";
  }

  async push(feedbackData) {
    const data = JSON.stringify(feedbackData);

    return fetch(this.url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
  }
}

export default API;
