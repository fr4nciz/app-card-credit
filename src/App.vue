<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
        <a class="navbar-brand" href="#"><img src="./assets/images/logo.svg" /></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile_nav" aria-controls="mobile_nav" aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span> 
        </button>
        <div class="collapse navbar-collapse" id="mobile_nav">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0 float-md-right">
        </ul>
        <ul class="navbar-nav navbar-light">
            <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Lorem Ipsum</a></li>      
       
   
            <li class="nav-item"><a class="nav-link" href="#">Lorem Ipsum</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Lorem Ipsum</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Lorem Ipsum us</a></li>   
        </ul>
        </div>
    </div>
</nav>
   
    <RegisterCard msg="Cartão de Crédito"/>
  </div>
</template>

<script>
import RegisterCard from './components/register-card.vue'

export default {
  name: 'App',
  components: {
    RegisterCard
  }
}
</script>

