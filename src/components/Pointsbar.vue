<template>
  <div class="radio-wrap">
    <span v-for="index in parseInt(size)" :key="index" class="grade-list-item">
      <label class="grade-label">
        <input
          v-on:change="emitResult(index)"
          type="radio"
          :value="index + '-' + code"
          class="grade-radio"
          :name="index + '-' + code"
          v-model="picked"
        />
        <span class="checkmark"></span>
        <p class="grade-index">{{ index }}</p>
      </label>
      <hr
        v-if="index === 1"
        :class="
          alertLine
            ? 'alert-line grades-line first-line'
            : 'grades-line first-line'
        "
      />
      <hr
        v-else-if="index === size"
        :class="
          alertLine
            ? 'alert-line grades-line last-line'
            : 'grades-line last-line'
        "
      />
      <hr
        v-else
        :class="alertLine ? 'alert-line grades-line' : 'grades-line'"
      />
      <span
        class="grade-limit position-right paragraph hideMobile"
        v-if="index === 1"
        >Плохо</span
      >
      <span
        class="grade-limit position-left paragraph hideMobile"
        v-if="index === size"
        >Отлично</span
      >
    </span>
  </div>
</template>

<script>
export default {
  name: "Pointsbar",
  props: {
    size: Number,
    code: String,
    alertLine: {
      default: false,
    },
  },
  data: function () {
    return {
      picked: "",
    };
  },
  methods: {
    emitResult(index) {
      this.$emit("change", index);
      this.$emit("alert", false);
      // this.alertLine = false;
    },
  },
};
</script>

<style scoped>
.grade-limit {
  width: 100%;
  display: block;
  text-align: right;
}

.grade-label {
  display: block;
  position: relative;
  color: darkgray;
  text-align: left;
}

input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  height: 26px;
  width: 26px;
  background-color: #eee;
  border-radius: 50%;
  z-index: 3;
  cursor: pointer;
}

.grade-label:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a orange background */
.grade-label input:checked ~ .checkmark {
  background-color: #ff6400;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.grade-label input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.grade-label .checkmark:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}

span:last-child label hr {
  width: 50%;
}

span:first-child label hr {
  width: 50%;
  margin-left: 50%;
}

.radio-wrap {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin: 3em 0;
}

.grade-label {
  display: block;
  position: relative;
  font-size: medium;
  color: darkgray;
  text-align: center;
}

.grade-list-item {
  position: relative;
  list-style: none;
  display: block;
  width: 100%;
}

.grade-index {
  padding-left: 23px;
}

.grade-radio {
  margin: 1em auto;
  display: block;
  position: relative;
  z-index: 2;
}

.grades-line {
  position: absolute;
  top: 16px;
  width: 100%;
  z-index: 1;
}

.first-line {
  width: 50%;
  margin-left: 55%;
}

.last-line {
  width: 55%;
}

.alert-line {
  color: #ff4a00;
  border: solid 1px #ff4a00;
}

@media only screen and (max-width: 320px) and (max-height: 568px) and (-webkit-device-pixel-ratio: 2),
  only screen and (max-width: 375px) and (max-height: 667px) and (-webkit-device-pixel-ratio: 2),
  only screen and (max-width: 375px) and (max-height: 812px),
  only screen and (max-width: 414px) and (max-height: 736px) and (-webkit-device-pixel-ratio: 3),
  only screen and (max-width: 411px) and (max-height: 731px),
  only screen and (max-width: 411px) and (max-height: 823px) {
  .radio-wrap {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-evenly;
    margin: 0.5em 0;
    width: 100%;
  }

  .grade-list-item {
    position: relative;
    flex-grow: 1;
    list-style: none;
    display: block;
    width: 100%;
  }

  .grade-label {
    display: block;
    position: relative;
    font-size: smaller;
    color: darkgray;
    text-align: center;
  }
  .grade-limit {
    position: absolute;
    width: 100%;
    display: block;
    text-align: right;
    font-size: smaller;
  }
  .checkmark {
    position: absolute;
    top: 2px;
    height: 17px;
    width: 17px;
    background-color: #eee;
    border-radius: 50%;
    z-index: 3;
  }

  .grade-label .checkmark:after {
    top: 5px;
    left: 5px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: white;
  }

  .grades-line {
    position: absolute;
    top: 14px;
    width: 100%;
    z-index: 1;
  }

  .position-left {
    text-align: right;
    right: 10px;
  }

  .position-right {
    text-align: right;
    right: 0;
  }

  .grade-index {
    padding-left: 12px;
  }

  .first-line {
    width: 50%;
    margin-left: 55%;
  }

  .last-line {
    width: 55%;
  }
}
</style>
