<template>
  <div
    :class="
      isSelected
        ? 'side-wrap eval-main-container height-support'
        : 'side-wrap eval-main-container'
    "
  >
    <div class="eval-header">
      <div class="checkbox-header" @click="isSelected = !isSelected">
        <label class="container optional-checkbox" v-if="isOptional">
          <input
            type="checkbox"
            :name="mainText"
            :checked="isSelected"
            @change="isSelected = !isSelected"
          />
          <span class="checkmark"></span>
        </label>
        <div class="mobile-header cursor">
          <h2 class="paragraph text-bold">{{ mainText }}</h2>
          <h3 v-if="secondaryText !== ''" class="secondary-text">
            {{ secondaryText }}
          </h3>
        </div>
      </div>
      <Pointsbar
        v-if="isSelected"
        v-on:change="updateRating($event)"
        :size="5"
        class="flex-big no-margin"
        :code="code"
      />
    </div>
    <div v-if="isSelected && isRated" class="eval-input">
      <textarea-autosize
        :class="
          screenWidth > 768
            ? 'feedback-textarea desktop-textarea'
            : 'feedback-textarea'
        "
        v-on:change="
          $emit('change', { rating: rating, feedback: $event.target.value })
        "
        v-model="suggestion"
        :min-height="1"
        :max-height="350"
        name="become_better"
        :placeholder="hint"
      />
    </div>
  </div>
</template>

<script>
import Pointsbar from "./Pointsbar";

export default {
  name: "Evaluation",
  components: { Pointsbar },
  props: {
    mainText: String,
    secondaryText: {
      default: "",
    },
    hint: String,
    isOptional: String,
  },
  data: function () {
    return {
      suggestion: "",
      rating: "",
      isSelected: false,
      isRated: null,
    };
  },
  created() {
    this.isSelected = this.isOptional !== "true";
  },
  computed: {
    code: function () {
      return this.mainText.substr(0, 3);
    },
    screenWidth() {
      return screen.width;
    },
  },
  methods: {
    updateRating: function (event) {
      this.rating = event;
      this.isRated = true;
      this.$emit("change", { rating: this.rating, feedback: this.suggestion });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.eval-main-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: distribute;
  justify-content: space-around;
}

.eval-header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  margin: 1em 0;
}

.checkbox-header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: start;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  margin: 1em 0;
  max-width: 347px;
}

.secondary-text {
  color: #939393;
  font-family: "Noto Sans", sans-serif;
  margin: 5px 0 0 0;
  padding: 0;
}

.no-margin {
  margin: 0;
}

.flex-very-small {
  -webkit-box-flex: 0;
  -ms-flex: 0 1 70px;
  flex: 0 1 70px;
}

.flex-small {
  -webkit-box-flex: 0;
  -ms-flex: 0 1 200px;
  flex: 0 1 200px;
  -ms-flex-item-align: center;
  -ms-grid-row-align: center;
  align-self: center;
}

.flex-big {
  -webkit-box-flex: 0;
  -ms-flex: 0 1 500px;
  flex: 0 1 500px;
  -ms-flex-item-align: center;
  -ms-grid-row-align: center;
  align-self: center;
}

.input-range {
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
h2 {
  margin: 0;
}

.optional-checkbox {
  flex-shrink: 0;
  min-width: 3em;
}

.container {
  display: block;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0px;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #ffffff;
  border: #989898 solid 2px;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #cccccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #ff6400;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

input[type="range"] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: #c7c7c7; /* Otherwise white in Chrome */
  border-radius: 10px;
  height: 7px;
}

input[type="range"]:hover {
  background: #ff6400; /* Otherwise white in Chrome */
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type="range"]:focus {
  outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}

input[type="range"]::-ms-track {
  width: 100%;
  cursor: pointer;

  /* Hides the slider so custom styles can be added */
  background: transparent;
  border-color: transparent;
  color: transparent;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: none;
  height: 40px;
  width: 40px;
  background: url("../assets/emote_wink.png") no-repeat;
  margin: -15px 0;
  border-radius: 0 !important;
}

/* All the same stuff for Firefox */
input[type="range"]::-moz-range-thumb {
  -moz-appearance: none;
  appearance: none;
  border: none;
  height: 40px;
  width: 40px;
  background: url("../assets/emote_wink.png") no-repeat;
  margin: -15px 0;
  border-radius: 0 !important;
}

/* All the same stuff for IE */
input[type="range"]::-ms-thumb {
  appearance: none;
  border: none;
  height: 40px;
  width: 40px;
  background: url("../assets/emote_wink.png") no-repeat;
  margin: -15px 0;
  border-radius: 0 !important;
}
.cursor {
  cursor: pointer;
}
.paragraph {
  color: #282828;
  transition: 0.4s;
}
.paragraph:hover {
  color: #ff6400;
}
@media only screen and (max-width: 320px) and (max-height: 568px) and (-webkit-device-pixel-ratio: 2),
  only screen and (max-width: 375px) and (max-height: 667px) and (-webkit-device-pixel-ratio: 2),
  only screen and (max-width: 375px) and (max-height: 812px),
  only screen and (max-width: 414px) and (max-height: 736px) and (-webkit-device-pixel-ratio: 3),
  only screen and (max-width: 411px) and (max-height: 731px),
  only screen and (max-width: 411px) and (max-height: 823px) {
  .eval-main-container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: distribute;
    justify-content: space-around;
  }

  .eval-header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: start;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    margin: 0.5em 0;
    text-align: left;
    width: 100%;
  }

  .flex-big {
    -webkit-box-flex: 0;
    -ms-flex: 0 1 30px;
    flex: 0 1 30px;
    -ms-grid-row-align: center;
    align-self: center;
    text-align: left;
  }

  .mobile-header {
    display: flex;
    flex-direction: column;
    color: #939393;
    width: 100%;
    min-height: 1em;
    font-size: 20px;
  }

  .checkbox-header {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    height: fit-content;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: start;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    margin: 1em 0 0.8em;
    flex-shrink: 0;
  }

  .secondary-text {
    color: #939393;
    font-family: "Noto Sans", sans-serif;
    margin: 5px 0 0;
    font-size: smaller;
    padding: 0;
    flex-shrink: 0;
  }

  .height-support {
    min-height: 14em;
  }

  .eval-input {
    padding-top: 3.4em;
  }
}
</style>
