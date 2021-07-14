<template>
  <div class="checkbox-container">
    <label class="label-container">
      <input
        @change="emitCheck"
        type="checkbox"
        class="label-text"
        :name="name"
        :checked="isChecked"
        :value="text"
      />
      <span class="checkmark"></span>
      <p class="label-text">{{ text }}</p>
    </label>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    text: String,
    name: String,
  },
  data() {
    return {
      isChecked: false,
    };
  },
  methods: {
    emitCheck() {
      this.isChecked = !this.isChecked;
      this.$emit("change", {
        bool: this.isChecked,
        text: this.text,
      });
    },
  },
};
</script>

<style scoped>
.checkbox-container {
  margin: 2em 0;
}

.label-container {
  display: block;
  position: relative;
  color: darkgray;
  text-align: left;
  font-family: "Noto Sans", sans-serif;
}

.label-text {
  display: inline;
  font-size: large;
  color: darkgray;
  text-align: left;
  cursor: pointer;
  margin-left: 2em;
  font-family: "Noto Sans", sans-serif;
}

input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

.label-container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.label-container input:checked ~ .checkmark {
  background-color: #ff6400;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.label-container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.label-container .checkmark:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}

@media only screen and (max-width: 320px) and (max-height: 568px) and (-webkit-device-pixel-ratio: 2),
  only screen and (max-width: 375px) and (max-height: 667px) and (-webkit-device-pixel-ratio: 2),
  only screen and (max-width: 375px) and (max-height: 812px),
  only screen and (max-width: 414px) and (max-height: 736px) and (-webkit-device-pixel-ratio: 3),
  only screen and (max-width: 411px) and (max-height: 731px),
  only screen and (max-width: 411px) and (max-height: 823px) {
  .label-container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    color: darkgray;
    text-align: left;
    font-family: "Noto Sans", sans-serif;
  }

  .label-text {
    display: inline;
    font-size: small;
    color: darkgray;
    text-align: left;
    margin: 0 0 0 3em;
    font-family: "Noto Sans", sans-serif;
  }
}
</style>
