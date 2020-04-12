<template>
  <div class="wrapper">
    <div class="card-form">
      <div class="card-list">

        <h3><i class="fas fa-chevron-left  float-left"></i><span>Etapa 2</span> de 3</h3>
      
        <h2>
          <img src="../assets/images/icon-card.svg">
          Adicione um novo <br />Cartão de Crédito
        </h2>

        <div class="card-item" v-bind:class="{ '-active' : isCardFlipped }">
          <div class="card-item__side -front">
            <div class="card-item__focus" v-bind:class="{'-active' : focusElementStyle }" v-bind:style="focusElementStyle" ref="focusElement"></div>
            <div class="card-item__cover">
              <img src="../assets/images/card.svg" class="card-item__bg">
            </div>
            
            <div class="card-item__wrapper">
              <div class="card-item__top">
                <div class="card-item__type">
                  <transition name="slide-fade-up">
                    <img src="../assets/images/Image_1.png" v-if="getCardType" v-bind:key="getCardType" alt="" class="card-item__typeImg">
                  </transition>
                </div>
              </div>
              <label for="cardNumber" class="card-item__number" ref="cardNumber">
                <template v-if="getCardType === 'amex'">
                 <span v-for="(n, $index) in amexCardMask" :key="$index">
                  <transition name="slide-fade-up">
                    <div
                      class="card-item__numberItem"
                      v-if="$index > 4 && $index < 14 && cardNumber.length > $index && n.trim() !== ''"
                    >*</div>
                    <div class="card-item__numberItem"
                      :class="{ '-active' : n.trim() === '' }"
                      :key="$index" v-else-if="cardNumber.length > $index">
                      {{cardNumber[$index]}}
                    </div>
                    <div
                      class="card-item__numberItem"
                      :class="{ '-active' : n.trim() === '' }"
                      v-else
                      :key="$index + 1"
                    >{{n}}</div>
                  </transition>
                </span>
                </template>

                <template v-else>
                  <span v-for="(n, $index) in otherCardMask" :key="$index">
                    <transition name="slide-fade-up">
                      <div
                        class="card-item__numberItem"
                        v-if="$index > 4 && $index < 15 && cardNumber.length > $index && n.trim() !== ''"
                      >*</div>
                      <div class="card-item__numberItem"
                        :class="{ '-active' : n.trim() === '' }"
                        :key="$index" v-else-if="cardNumber.length > $index">
                        {{cardNumber[$index]}}
                      </div>
                      <div
                        class="card-item__numberItem"
                        :class="{ '-active' : n.trim() === '' }"
                        v-else
                        :key="$index + 1"
                      >{{n}}</div>
                    </transition>
                  </span>
                </template>
              </label>
              <div class="card-item__content">
                <label for="cardName" class="card-item__info" ref="cardName">
                  <transition name="slide-fade-up">
                    <div class="card-item__name" v-if="cardName.length" key="1">
                      <transition-group name="slide-fade-right">
                        <span class="card-item__nameItem" v-for="(n, $index) in cardName.replace(/\s\s+/g, ' ')" :key="n"><span v-if="$index === $index" v-bind:key="$index + 1">{{n}}</span></span>
                      </transition-group>
                    </div>
                    <div class="card-item__name" v-else key="2">NOME NO CARTÃO</div>
                  </transition>
                </label>
                <div class="card-item__date">
                  <label for="cardMonth" class="card-item__dateItem" ref="cardMonth">
                    <transition name="slide-fade-up">
                      <span v-if="cardMonth" v-bind:key="cardMonth">{{cardMonth}}</span>
                      <span v-else key="5">MM/AA</span>
                    </transition>
                  </label>
           
                </div>
              </div>
            </div>
          </div>
          <div class="card-item__side -back">
            <div class="card-item__cover">
              <img src="../assets/images/card-vers.svg" class="card-item__bg">
            </div>
            <div class="card-item__band"></div>
            <div class="card-item__cvv">               
                <div class="card-item__cvvBand">
                  <span v-for="(n, $index) in cardCvv" :key="$index">
                    *
                  </span>

              </div>             
            </div>
          </div>
        </div>
      </div>
      <div class="card-form__inner">
        <div class="card-input input-group">
          <input type="text" id="cardNumber" class="card-input__input" v-mask="generateCardNumberMask" v-model="cardNumber" v-on:focus="focusInput" v-on:blur="blurInput" data-ref="cardNumber" autocomplete="off" required>
            <label for="cardNumber">Numero Cartão</label>
        </div>
        <div class="card-input input-group">
          <input type="text"  id="cardName" class="card-input__input" v-model="cardName" v-on:focus="focusInput" v-on:blur="blurInput" data-ref="cardName" autocomplete="off" required>
          <label for="cardName">Nome Igual Cartão</label>
        </div>
        <div class="card-form__row">
          <div class="card-form__col">
            <div class="card-input input-group">
              <input type="text" id="cardMonth" class="card-input__input" v-model="cardMonth" v-on:focus="focusInput" v-on:blur="blurInput" data-ref="cardMonth" autocomplete="off" required>
              <label for="cardMonth">Validade</label>     
            </div>
          </div>
          <div class="card-form__col -cvv">
            <div class="card-input input-group">
              <input type="text" class="card-input__input" id="cardCvv" v-mask="'##/##'" maxlength="4" v-model="cardCvv" v-on:focus="flipCard(true)" v-on:blur="flipCard(false)" autocomplete="off" required>
              <label for="cardCvv">CVV</label> 
            </div>
          </div>
        </div>

        <button class="card-form__button">
          CONTINUAR
        </button>
      </div>    </div>
    

  </div>
</template>

<script>
  export default {
    name: 'Card',
   data() {
    return {
      currentCardBackground: Math.floor(Math.random()* 25 + 1), // just for fun :D
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      minCardYear: new Date().getFullYear(),
      amexCardMask: "#### ###### #####",
      otherCardMask: "#### #### #### ####",
      cardNumberTemp: "",
      isCardFlipped: false,
      focusElementStyle: null,
      isInputFocused: false
    };
  },
  mounted() {
    this.cardNumberTemp = this.otherCardMask;
    document.getElementById("cardNumber").focus();
    document.getElementById("cardMonth").focus();
  },
  computed: {
    getCardType () {
      let number = this.cardNumber;
      let re = new RegExp("^4");
      if (number.match(re) != null) return "visa";

      re = new RegExp("^(34|37)");
      if (number.match(re) != null) return "amex";

      re = new RegExp("^5[1-5]");
      if (number.match(re) != null) return "mastercard";

      re = new RegExp("^6011");
      if (number.match(re) != null) return "discover";
      
      re = new RegExp('^9792')
      if (number.match(re) != null) return 'troy'

      return "visa"; // default type
    },
		generateCardNumberMask () {
			return this.getCardType === "amex" ? this.amexCardMask : this.otherCardMask;
    },
    minCardMonth () {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    }
  },
  watch: {
    cardYear () {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = "";
      }
    }
  },
  methods: {
    flipCard (status) {
      this.isCardFlipped = status;
    },
    focusInput (e) {
      this.isInputFocused = true;
      let targetRef = e.target.dataset.ref;
      let target = this.$refs[targetRef];
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
      }
    },
    blurInput() {
      let vm = this;
      setTimeout(() => {
        if (!vm.isInputFocused) {
          vm.focusElementStyle = null;
        }
      }, 300);
      vm.isInputFocused = false;
    }
  }
  }
</script>