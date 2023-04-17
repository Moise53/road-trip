<template>
    <div class="auth">
        <div style="filter: blur(4px); background-color: rgba(0, 0, 0, 0.316);">
            <div id="parallax"></div>
        </div>
        <div v-if="!signin && !signup" id="centered-text">
            <h1 class="title">Un voyage sans stresse ?</h1>
            <p class="subtitle">Epic Road Trip</p>
            <button class="button-45" role="button" v-on:click="getStarted">Get started</button>
        </div>
        <div v-if="signin && !signup" id="centered-container" style="top: 10%">
            <div class="glass-container">
                <p class="signin-title">Epic Road Trip</p>
                <p class="signup-text">Please login to your account</p>
                <p class="error">{{ error }}</p>
                <input type="text" v-model="email" class="input" style="margin-top: 3%" id="lname" name="lastname"
                    placeholder="E-mail">
                <input type="password" class="input" v-model="password" style="margin-top: 5%" id="lname" name="lastname"
                    placeholder="Mot de passe">
                <div class="button-row">
                    <v-btn class="button-signin no-shadow" color="#164465" height="7vh" width="25vh" v-on:click="logIn">
                        Connexion
                    </v-btn>
                    <v-btn class="button-signup no-shadow" height="7vh" width="25vh" v-on:click="signUp">
                        Inscription
                    </v-btn>
                </div>
            </div>
        </div>
        <div v-if="signup && !signin" id="centered-text" style="top: 7vh;">
            <div class="glass-container" style="height: 90vh">
                <p class="signin-title">Epic Road Trip</p>
                <p class="signup-text">Please subscribe to Epic Road Trip</p>
                <p class="error">{{ error }}</p>
                <input v-model="name" type="text" class="input" style="margin-top: 3%" id="lname" name="lastname"
                    placeholder="Prénom">
                <input v-model="email" type="text" class="input" style="margin-top: 5%" id="lname" name="lastname"
                    placeholder="E-mail">
                <input v-model="password" type="password" class="input" style="margin-top: 5%" id="lname" name="lastname"
                    placeholder="Mot de passe">
                <div class="button-row">
                    <v-btn class="button-signin no-shadow" color="#164465" height="7vh" width="25vh"
                        v-on:click="createAccount">
                        Inscription
                    </v-btn>
                    <v-btn class="button-signup no-shadow" height="7vh" width="25vh" v-on:click="signIn">
                        Connexion
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { loginServices, signupServices } from '@/services/Auth.js';

export default {
    name: 'HomePage',
    data() {
        return {
            isLogged: false,
            signup: false,
            signin: false,
            email: '',
            password: '',
            error: '',
        }
    },
    methods: {
        getStarted() {
            if (localStorage.getItem("user")) {
                this.$router.push('/home');
            } else
                this.signin = true;
        },
        async logIn() {
            const res = await loginServices(this.email, this.password);

            if (res.error) {
                console.log(res.data);
                this.error = res.data;
            } else {
                localStorage.setItem("user", JSON.stringify({ 'token': res.data.token, 'name': res.data.user.name, 'id': res.data.user.id }));
                this.$router.push('/home');
            }
        },
        async createAccount() {
            const res = await signupServices(this.name, this.email, this.password);
            if (res.error) {
                console.log(res.data);
                this.error = res.data;
            } else {
                this.signIn();
            }
        },
        signUp() {
            this.signup = true;
            this.signin = false;
        },
        signIn() {
            this.signup = false;
            this.signin = true;
        }
    },
    mounted() {
        (function () {
            // Add event listener
            document.addEventListener("mousemove", parallax);
            const elem = document.querySelector("#parallax");
            console.log(elem);
            // Magic happens here
            function parallax(e) {
                let _w = window.innerWidth / 2;
                let _h = window.innerHeight / 2;
                let _mouseX = e.clientX;
                let _mouseY = e.clientY;
                let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
                let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
                let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
                let x = `${_depth3}, ${_depth2}, ${_depth1}`;
                elem.style.backgroundPosition = x;
            }

        })();
    }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Abhaya+Libre');
@import url('https://fonts.googleapis.com/css2?family=Hurricane&display=swap');

.auth {
    margin: 0;
    background-color: #1d1e22;
}

.parallax-color {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.316);
    width: 100%;
    height: 100%;
}

.title {
    font-family: 'Abhaya Libre';
    color: #fff;
    text-align: center;
    top: 47%;
    font-size: 60px;
}

.subtitle {
    font-family: 'Hurricane', cursive;
    color: #164465;
    text-align: center;
    font-size: 7rem;
}

.no-shadow {
    box-shadow: none;
}

.error {
    color: #FF0000;
    font-size: 1rem;
    margin-left: 8%;
}

.signin-title {
    font-family: 'Hurricane';
    color: #164465;
    text-align: center;
    top: 47%;
    font-size: 5rem;
}

.button-signin {
    border-radius: 50px;
    color: #ffffff !important;
    font-family: 'Abhaya Libre';
    font-size: 1.2rem !important;
}

.button-signup {
    border-radius: 50px;
    background-color: rgba(0, 0, 0, 0) !important;
    border: 2px solid #164465;
    color: #164465 !important;
    font-family: 'Abhaya Libre';
    font-size: 1.2rem !important;
}

.input {
    background-color: #FFFFFF;
    border-radius: 20px;
    width: 85%;
    height: 10%;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-left: 5%;
    padding: 20px;
}

.signup-text {
    font-family: 'Abhaya Libre', cursive;
    color: #164465;
    font-size: 2.5rem;
    font-weight: 500;
    width: 70%;
    text-align: start;
    margin-left: 8%;
    margin-top: 3%;
}

.button-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto;
    margin-top: 7%;
}

#centered-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 20vh;
    left: 30vw;

}

.glass-container {
    height: 80vh;
    width: 40vw;
    background: rgba(255, 255, 255, 0.33);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.99);
}

#parallax {
    position: relative;
    width: 100%;
    height: 100vh;
    background-image: url('../assets/parallax/clouds_2.png'), url('../assets/parallax/clouds_1.png'), url('../assets/parallax/rocks_2.png'), url('../assets/parallax/rocks_1.png'), url('../assets/parallax/sky.png');
    background-repeat: no-repeat;
    background-position: center;
    background-position: 50% 50%;
}

#centered-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 30vw;
    top: 35%;
}

.button-45 {
    height: 8vh;
    width: 25vh;
    align-items: center;
    background-color: #ffffff;
    background-position: 0 0;
    border: 1px solid #FEE0E0;
    border-radius: 40px;
    box-sizing: border-box;
    color: #8CB0CB;
    cursor: pointer;
    display: flex;
    font-family: 'Abhaya Libre';
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 33.4929px;
    list-style: outside url(https://www.smashingmagazine.com/images/bullet.svg) none;
    padding: 2px 12px;
    text-align: center;
    justify-content: center;
    text-decoration: none;
    text-shadow: none;
    text-underline-offset: 1px;
    transition: border .2s ease-in-out, box-shadow .2s ease-in-out;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    word-break: break-word;
    margin-top: 5vh;
}

.button-45:active,
.button-45:hover,
.button-45:focus {
    outline: 0;
}


.button-45:active {
    background-color: #D33A2C;
    box-shadow: rgba(0, 0, 0, 0.12) 0 1px 3px 0 inset;
    color: #FFFFFF;
}

.button-45:hover {
    background-color: #e5eaf9;
    border-color: #8CB0CB;
    border-width: 3px;
}

.button-45:active:hover,
.button-45:focus:hover,
.button-45:focus {
    background-color: #388ac9;
    box-shadow: rgba(0, 0, 0, 0.12) 0 1px 3px 0 inset;
    color: #FFFFFF;
}
</style>