<template>
  <div id="app" class="app-wrap">
    <div v-if="isLoading" class="se-pre-con"></div>
    <img
      alt="Gomobile logo"
      src="./assets/gomobile-logo.png"
      class="company-logo"
    />
    <form v-if="!showThanks" action="#">
      <div class="paragraph-wrap">
        <h1 class="text-bold text-primary no-top-margin">
          Помогите нам стать лучше
        </h1>
        <p class="paragraph">
          Мы проводим этот опрос, чтобы понять, что мы делаем хорошо, что плохо
          и как стать лучше.<br />
          Все вопросы, кроме одного, необязательные. Но мы надеемся на то, что
          вы уделите 4 минуты (мы засекали!) и ответите на все.<br />
          Если всё-таки времени слишком мало,
          <a href="https://gomobile.ru/feedback" class="orange-text">здесь</a>
          сокращённая версия: только одно пустое поле.
        </p>
        <p class="paragraph">
          Впишите своё имя или компанию. Это необязательно, но может помочь нам
          быстрее решить проблему, если она у вас есть. <br />Или похвалить
          сотрудников, которые работают с вашим проектом ☺
        </p>
        <h2 class="top-wrap text-bold text-primary">
          Напишите своё имя и фамилию
        </h2>
        <textarea-autosize
          :class="
            screenWidth > 768
              ? 'feedback-textarea desktop-textarea'
              : 'feedback-textarea'
          "
          v-model="feedbackData.name"
          type="text"
          :min-height="10"
          :max-height="350"
          placeholder="Иванов Иван Иванович"
        />
        <h2 :class="{ alertLine: isAlert }" class="text-bold" id="must-answer">
          <span class="text-primary custom-asterisk">*</span>
          Как вы оцениваете работу с нами?
          <span v-if="isAlert" class="text-primary custom-asterisk"
            >(Обязательно)</span
          >
        </h2>
        <Pointsbar
          @change="feedbackData.fullRating = $event"
          @alert="isAlert = $event"
          :alertLine="isAlert"
          :size="10"
          code="full"
        />
        <h2 class="text-bold text-primary">
          Оцените отдельно каждый юнит Go Mobile
        </h2>
        <p class="paragraph">
          У нас много отделов/юнитов. Некоторые подключаются к работе с проектом
          всегда, другие – не обязательно. Отметьте галочками те юниты, с
          которыми вы работали. Оставшиеся оценивать не нужно.
        </p>
      </div>
      <Evaluation
        @change="feedbackData.depts.clientService = $event"
        main-text="Клиентский сервис"
        hint="Что нам сделать, чтобы улучшить работу в этом отделе/юните?"
      />
      <Evaluation
        @change="feedbackData.depts.finance = $event"
        main-text="Документооборот и финансы"
        hint="Что нам сделать, чтобы улучшить работу в этом отделе/юните?"
      />
      <h2
        :class="{ alertLine: isAlert }"
        class="text-bold"
        id="must-answer-work"
      >
        <span class="text-primary custom-asterisk">*</span>
        Оцените работу отдела/юнита
        <span v-if="isAlert" class="text-primary custom-asterisk"
          >(минимум 1)</span
        >
      </h2>
      <Evaluation
        @change="feedbackData.depts.mediaBuying = $event"
        main-text="Медиабаинг"
        hint="Что нам сделать, чтобы улучшить работу в этом отделе/юните?"
        is-optional="true"
      />
      <Evaluation
        @change="feedbackData.depts.specialProjects = $event"
        main-text="Спецпроекты"
        secondary-text="(а также TikTok, Likee, Tinder и Badoo)"
        hint="Что нам сделать, чтобы улучшить работу в этом отделе/юните?"
        is-optional="true"
      />
      <Evaluation
        @change="feedbackData.depts.influence = $event"
        main-text="Блогеры"
        hint="Что нам сделать, чтобы улучшить работу в этом отделе/юните?"
        is-optional="true"
      />
      <Evaluation
        @change="feedbackData.depts.aso = $event"
        main-text="ASO"
        hint="Что нам сделать, чтобы улучшить работу в этом отделе/юните?"
        is-optional="true"
      />
      <Evaluation
        @change="feedbackData.depts.goNet = $event"
        main-text="Go NET"
        hint="Что нам сделать, чтобы улучшить работу в этом отделе/юните?"
        is-optional="true"
      />
      <Evaluation
        @change="feedbackData.depts.design = $event"
        main-text="Дизайн"
        hint="Что нам сделать, чтобы улучшить работу в этом отделе/юните?"
        is-optional="true"
      />
      <Evaluation
        @change="feedbackData.depts.consulting = $event"
        main-text="Консалтинг"
        hint="Что нам сделать, чтобы улучшить работу в этом отделе/юните?"
        is-optional="true"
      />
      <div class="paragraph-wrap">
        <h2 class="text-bold text-primary">Насколько мы выполняем KPIs?</h2>
        <Pointsbar @change="feedbackData.kpiRating = $event" :size="10" />
        <h2 class="text-bold text-primary">Как вы о нас узнали?</h2>
        <Checkbox
          @change="addHowFound"
          text="Прочитал статью/новость"
          name="howFound"
        />
        <Checkbox
          @change="addHowFound"
          text="В рейтингах AdIndex/Ruward/Sostav"
          name="howFound"
        />
        <Checkbox
          @change="addHowFound"
          text="Рекомендации коллег"
          name="howFound"
        />
        <Checkbox
          @change="addHowFound"
          text="Со мной познакомился сотрудник агентства и рассказал"
          name="howFound"
        />
        <Checkbox
          @change="addHowFound"
          text="Был на ваших мероприятиях"
          name="howFound"
        />
        <Checkbox
          @change="addHowFound"
          text="Был на выступлении спикера от агентства"
          name="howFound"
        />
        <Checkbox @change="addHowFound" text="Другое" name="howFound" />
        <textarea-autosize
          v-if="isActiveOther"
          :class="
            screenWidth > 768
              ? 'feedback-textarea desktop-textarea'
              : 'feedback-textarea'
          "
          v-model="otherHowFound"
          :min-height="10"
          :max-height="350"
          name="other"
          placeholder='Если вы выбрали ответ "Другое", напишите тут, как вы о нас узнали'
        />
        <h2 class="top-wrap text-bold text-primary">Как нам стать лучше?</h2>
        <textarea-autosize
          :class="
            screenWidth > 768
              ? 'feedback-textarea desktop-textarea'
              : 'feedback-textarea'
          "
          v-model="feedbackData.feedback"
          :min-height="10"
          :max-height="350"
          name="become_better"
          placeholder="Напишите здесь что угодно, о чём мы не спросили в нашем опросе"
        />
      </div>
      <button type="button" class="submit-button" @click="sendFeedback">
        <span>Отправить</span><img src="./assets/message.svg" />
      </button>
    </form>
    <div v-else class="thanks-text">
      <h1>Спасибо за вашу обратную связь!</h1>
      <p>Задачи по оптимизации уже поставлены в наш таск-менеджер :)</p>
      <p>
        Если вы хотите обсудить конкретные предложения/замечания или начать
        диалог, напишите директору по клиентскому
        <span class="nowrap-text"
          >сервису – Алине (<a
            class="enable-select"
            href="mailto: alina@gomobile.ru"
            >alina@gomobile.ru</a
          >)</span
        >
        или генеральному
        <span class="nowrap-text"
          >директору – Алексею (<a
            class="enable-select"
            href="mailto: alex@gomobile.ru"
            >alex@gomobile.ru</a
          >)</span
        >.
      </p>
    </div>
  </div>
</template>

<script>
import Evaluation from "./components/Evaluation.vue";
import Pointsbar from "./components/Pointsbar";
import Checkbox from "./components/Checkbox";
import API from "./api";

export default {
  name: "App",
  components: {
    Checkbox,
    Evaluation,
    Pointsbar,
  },
  data: function () {
    return {
      otherHowFound: "",
      showThanks: false,
      isLoading: false,
      isAlert: false,
      feedbackData: {
        version: "v2",
        name: "",
        fullRating: "",
        depts: {
          clientService: {
            rating: "",
            feedback: "",
          },
          finance: {
            rating: "",
            feedback: "",
          },
          mediaBuying: {
            rating: "",
            feedback: "",
          },
          specialProjects: {
            rating: "",
            feedback: "",
          },
          influence: {
            rating: "",
            feedback: "",
          },
          aso: {
            rating: "",
            feedback: "",
          },
          goNet: {
            rating: "",
            feedback: "",
          },
          design: {
            rating: "",
            feedback: "",
          },
          consulting: {
            rating: "",
            feedback: "",
          },
        },
        kpiRating: "",
        howFound: [],
        feedback: "",
      },
    };
  },

  methods: {
    sendFeedback: async function () {
      if (this.isActiveOther) {
        const index = this.feedbackData.howFound.indexOf("Другое");
        this.feedbackData.howFound[index] = this.otherHowFound;
      }
      // this.feedbackData.howFound = this.feedbackData.howFound.join("; ");
      if (this.feedbackData.fullRating.length === 0) {
        document
          .getElementById("must-answer")
          .scrollIntoView({ block: "center", behavior: "smooth" });
        this.isAlert = true;
        return;
      }
      const deep = this.feedbackData.depts;
      let arrDeep = [];
      for (let key in deep) {
        if (deep[key].rating.length != 0) {
          arrDeep.push(deep[key]);
        }
      }
      if (arrDeep.length === 0) {
        document
          .getElementById("must-answer-work")
          .scrollIntoView({ block: "center", behavior: "smooth" });
        this.isAlert = true;
        return;
      }

      this.isLoading = true;
      const that = this;
      try {
        const api = new API();
        await api.push(this.feedbackData).then(function () {
          that.isLoading = false;
        });
      } catch (e) {
        console.error(e);
      }
      this.showThanks = true;
      console.log(this.feedbackData);
    },

    addHowFound(val) {
      if (val.bool) {
        this.feedbackData.howFound.push(val.text);
      } else {
        this.feedbackData.howFound = this.feedbackData.howFound.filter((el) => {
          return el != val.text;
        });
      }
      // console.log(val);
    },
  },
  computed: {
    screenWidth() {
      return screen.width;
    },
    isActiveOther() {
      if (this.feedbackData.howFound.includes("Другое")) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
textarea:focus,
input:focus {
  outline: none;
  resize: none;
  border-bottom: 2px solid #696267;
  font-family: "Noto Sans", sans-serif;
}

p {
  font-family: "Noto Sans", sans-serif;
}

.se-pre-con {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
  opacity: 0.5;
  background: url("./assets/loading.gif") center no-repeat #fff;
}
* {
  box-sizing: border-box;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px auto;
}

.app-wrap {
  max-width: 1000px;
  margin: 0 auto;
}

.company-logo {
  display: block;
  margin: 0 auto;
  max-width: 150px;
  max-height: 150px;
}

.custom-asterisk {
  font-size: larger;
}

.paragraph {
  font-size: medium;
  color: darkgray;
  text-align: left;
  font-family: "Noto Sans", sans-serif;
}

.paragraph-wrap {
  padding: 1.5em 1em 0em 1em;
}

.side-wrap {
  padding: 0.5em 2em 0em 2em;
}

.top-wrap {
  padding: 1.5em 0 0 0;
}

.feedback-input {
  display: block;
  width: 100%;
  border: none;
  border-bottom: 2px solid #d9d9d9;
  margin-bottom: 0.5em;
  padding: 4px;
  font-size: 0.9em;
  height: 2.2em;
}

.feedback-input::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  font-weight: bold;
  font-size: 1.6em;
  font-family: "Noto Sans", sans-serif;
  color: #ff7900;
  line-height: 1.8em;
  white-space: pre-line;
  position: relative;
}
.feedback-input::-moz-placeholder {
  /* Firefox 19+ */
  font-weight: bold;
  font-size: 1.6em;
  font-family: "Noto Sans", sans-serif;
  color: #ff7900;
}
.feedback-input:-ms-input-placeholder {
  /* IE 10+ */
  font-weight: bold;
  font-size: 1.6em;
  font-family: "Noto Sans", sans-serif;
  color: #ff7900;
}
.feedback-input:-moz-placeholder {
  /* Firefox 18- */
  font-weight: bold;
  font-size: 1.6em;
  font-family: "Noto Sans", sans-serif;
  color: #ff7900;
}

.feedback-textarea {
  display: block;
  width: 100%;
  border: 2px solid #d9d9d9;
  border-radius: 0.5em;
  font-family: "Noto Sans", sans-serif;
  /*line-height: 1.8em;*/
  margin-bottom: 0.5em;
  padding: 8px 8px 0 8px;
  font-size: 1em;
}

.desktop-textarea {
  border: none;
  height: auto !important;
  border-bottom: solid #918a8f 1px;
  padding: 8px 8px 0 8px;
  border-radius: 0;

  resize: none;
}

::-webkit-input-placeholder {
  color: lightgray;
  font-size: medium;
  font-family: "Noto Sans", sans-serif;
  opacity: 1;
}

::-moz-placeholder {
  color: lightgray;
  font-size: medium;
  font-family: "Noto Sans", sans-serif;
  opacity: 1;
}

:-ms-input-placeholder {
  color: lightgray;
  font-size: medium;
  font-family: "Noto Sans", sans-serif;
  opacity: 1;
}

::-ms-input-placeholder {
  color: lightgray;
  font-size: medium;
  font-family: "Noto Sans", sans-serif;
  opacity: 1;
}

::placeholder {
  color: lightgray;
  font-size: medium;
  font-family: "Noto Sans", sans-serif;
  opacity: 1;
}

.text-bold {
  font-weight: bold;
  color: #282828;
  font-size: x-large;
  font-family: "Noto Sans", sans-serif;
  text-align: left;
}

.text-primary {
  text-decoration: none;
  color: #ff7900;
}

.submit-button {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-weight: lighter;
  margin: 2em auto;
  padding: 0.7em 1em;
  width: -moz-fit-content;
  width: fit-content;
  height: fit-content;
  color: #ff7900;
  font-family: "Noto Sans", sans-serif;
  font-size: x-large;
  text-align: center;
  background-color: white;
  border: solid white 2px;
  border-radius: 2em;
  cursor: pointer;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-box-shadow: 3px 20px 80px #cdcdcd;
  box-shadow: 3px 20px 80px #cdcdcd;
}

.submit-button span {
  margin-right: 10px;
}

.submit-button:hover {
  -webkit-box-shadow: 3px 20px 80px #939393;
  box-shadow: 3px 20px 80px #939393;
}

.submit-button:focus {
  outline: none;
}

.thanks-text {
  font-family: "Noto Sans", sans-serif;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: start;
  margin: 50px;
  padding: 56px 94px 60px 64px;
  border-radius: 50px 50px 0 50px;
  -webkit-box-shadow: 3px 23px 84px gray;
  box-shadow: 3px 23px 84px gray;
  color: #3e3e3e;

  max-height: 500px;
  max-width: calc(900px - 94px - 64px);
}

.thanks-text a {
  text-decoration: none;
  color: #ff6400;
}

.nowrap-text {
  white-space: nowrap;
}

.thanks-text h1 {
  padding: 0;
  margin: 0 0 40px;
  text-align: center;
}

.thanks-text p {
  text-align: start;
}

.orange-text {
  color: #ff7900;
}

.no-top-margin {
  margin-top: 0;
}

@media only screen and (max-width: 375px) and (max-height: 667px) and (-webkit-device-pixel-ratio: 2),
  only screen and (max-width: 375px) and (max-height: 812px),
  only screen and (max-width: 414px) and (max-height: 736px) and (-webkit-device-pixel-ratio: 3),
  only screen and (max-width: 411px) and (max-height: 731px),
  only screen and (max-width: 411px) and (max-height: 823px) {
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 10px auto;
  }

  .company-logo {
    max-width: 100px;
    max-height: 100px;
  }

  .paragraph {
    font-size: small;
    color: darkgray;
    text-align: left;
    font-family: "Noto Sans", sans-serif;
  }

  .paragraph-wrap {
    padding: 1em;
  }

  .side-wrap {
    padding: 0 3em 0 2em;
  }

  .top-wrap {
    padding: 0.7em 0 0 0;
  }

  .text-bold {
    margin-top: 1.5em;
    font-weight: bold;
    color: #282828;
    font-size: medium;
    font-family: "Noto Sans", sans-serif;
    text-align: left;
  }

  .text-primary {
    margin-top: 1.5em;
    font-size: large;
    text-decoration: none;
    color: #ff7900;
  }

  .feedback-input {
    display: block;
    width: 100%;
    border: none;
    border-bottom: 2px solid #d9d9d9;
    margin-bottom: 0.5em;
    padding: 4px 0 10px;
    font-size: 0.7em;
    height: 2.4em;
  }

  .feedback-input::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    font-weight: bold;
    font-size: 1.55em;
    font-family: "Noto Sans", sans-serif;
    color: #ff7900;
    line-height: 1.6em;
  }
  .feedback-input::-moz-placeholder {
    /* Firefox 19+ */
    font-weight: bold;
    font-size: 1.55em;
    font-family: "Noto Sans", sans-serif;
    line-height: 1.6em;
    color: #ff7900;
  }
  .feedback-input:-ms-input-placeholder {
    /* IE 10+ */
    font-weight: bold;
    font-size: 1.55em;
    font-family: "Noto Sans", sans-serif;
    line-height: 1.6em;
    color: #ff7900;
  }
  .feedback-input:-moz-placeholder {
    /* Firefox 18- */
    font-weight: bold;
    font-size: 1.55em;
    font-family: "Noto Sans", sans-serif;
    line-height: 1.6em;
    color: #ff7900;
  }

  .submit-button {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-weight: lighter;
    margin: 2em auto;
    padding: 0.7em 1em;
    width: -moz-fit-content;
    width: fit-content;
    height: fit-content;
    color: #ff7900;
    font-family: "Noto Sans", sans-serif;
    font-size: large;
    text-align: center;
    background-color: white;
    border: solid white 2px;
    border-radius: 2em;
    cursor: pointer;
    -webkit-transition-duration: 0.3s;
    -o-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-box-shadow: 3px 20px 80px #cdcdcd;
    box-shadow: 3px 20px 80px #cdcdcd;
  }

  ::-webkit-input-placeholder {
    color: lightgray;
    font-size: small;
    font-family: "Noto Sans", sans-serif;
    opacity: 1;
  }

  ::-moz-placeholder {
    color: lightgray;
    font-size: small;
    font-family: "Noto Sans", sans-serif;
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: lightgray;
    font-size: small;
    font-family: "Noto Sans", sans-serif;
    opacity: 1;
  }

  ::-ms-input-placeholder {
    color: lightgray;
    font-size: small;
    font-family: "Noto Sans", sans-serif;
    opacity: 1;
  }

  ::placeholder {
    color: lightgray;
    font-size: small;
    font-family: "Noto Sans", sans-serif;
    opacity: 1;
  }

  .thanks-text {
    font-family: "Noto Sans", sans-serif;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: start;
    margin: 0 15px;
    max-width: 365px;
    padding: 23px 32px 30px 32px;
    border-radius: 25px 25px 0 25px;
    -webkit-box-shadow: 3px 13px 44px gray;
    box-shadow: 3px 13px 44px gray;

    max-height: 500px;
    /*max-width: calc(900px - 94px - 64px);*/
  }

  .thanks-text h1 {
    font-size: large;
    margin-bottom: 12px;
  }

  .thanks-text p {
    font-size: smaller;
  }

  .no-top-margin {
    margin-top: 0;
  }
}
.alertLine {
  color: #ff2600;
}
@media only screen and (max-width: 320px) and (max-height: 568px) and (-webkit-device-pixel-ratio: 2) {
  .paragraph-wrap {
    padding: 1em 1.5em 0 0.5em;
  }

  .side-wrap {
    padding: 0 3em 0 2em;
  }

  .top-wrap {
    padding: 0.7em 0 0 0;
  }

  .thanks-text p {
    font-size: x-small;
  }

  .no-top-margin {
    margin-top: 0;
  }
}
@media only screen and (max-width: 535px) {
  .hideMobile {
    display: none !important;
  }
}
</style>
