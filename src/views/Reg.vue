<template lang="pug">
.auth 
	h2 registration
	form(@submit.prevent="checkForm")
		#name 
			label(for="name") name
			input#name.neuroInput(
				type="text",
				v-model.trim="form.name",
				:class="{ invalid: ($v.form.name.$dirty && !$v.form.name.required) || ($v.form.email.$dirty && !$v.form.name.minLength) }"
			)
			small(v-if="$v.form.name.$dirty && !$v.form.name.required") field is required
			small(v-else-if="$v.form.name.$dirty && !$v.form.name.minLength") min length {{ $v.form.name.$params.minLength.min }} character
		#email
			label(for="formEmail") email
			input#formEmail.neuroInput(
				type="email",
				v-model.trim="form.email",
				:class="{ invalid: ($v.form.email.$dirty && !$v.form.email.required) || ($v.form.email.$dirty && !$v.form.email.email) }"
			)
			small(v-if="$v.form.email.$dirty && !$v.form.email.required") field is required
			small(v-else-if="$v.form.email.$dirty && !$v.form.email.email") incorrect email
		#password
			label(for="formPassword") Password
			input#formPassword.neuroInput(
				type="text",
				v-model.trim="form.password",
				:class="{ invalid: ($v.form.password.$dirty && !$v.form.password.required) || ($v.form.password.$dirty && !$v.form.password.minLength) }"
			)
			small(v-if="$v.form.password.$dirty && !$v.form.password.required") field is required
			small(v-else-if="$v.form.password.$dirty && !$v.form.password.minLength") min length {{ $v.form.password.$params.minLength.min }} character
		#accept 
			label
				input#acceptRule(type="checkbox", v-model="privacy")
				span#fake 
				span.blockSelect I have read and agree
				router-link(to="/policy") privacy policy
		#authorize.pointer
			button.modal-btn(
				:disabled="form.email.length < 1 || form.password.length < 1 || !privacy"
			) sign up
			#registration(@click="$router.push('/auth')") authorize
</template>

<script>
/* eslint-disable */
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapActions, mapMutations } from "vuex";
import firebase from "firebase/app";
export default {
	mixin: [],
	data: () => ({
		privacy: true,
		message: "",
		form: {
			name: "",
			email: "",
			password: ""
		}
	}),
	methods: {
		...mapActions(['accessAllowed']),
		...mapMutations(['SET_USER_NAME', "SET_INFO_MESSAGE"]),
		async checkForm() {
			if (this.$v.form.$invalid) {
				this.$v.form.$touch();
				return;
			}
			try {
				await firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
				this.SET_USER_NAME(this.form.name)
				this.accessAllowed("account registred")
			} catch (e) {
				this.SET_INFO_MESSAGE(e.message);
				console.log("failed to access with email", e.message);
			}
		}
	},
	validations: {
		form: {
			name: {
				required,
				minLength: minLength(1)
			},
			email: {
				required,
				email
			},
			password: {
				required,
				minLength: minLength(6)
			}
		}
	}
};
</script>
<style lang="sass" scoped>
#accept
	display: flex
	align-items: center
	justify-content: space-between
	input
		display: none
	label
		font-size: 1rem
	a
		color: var(--akcentLight)
		margin-left: .2rem
	span
		margin-left: 1rem
	#fake
		display: inline-block
		width: 2rem
		height: 2rem
		border: 2px solid var(--akcentLight)
		position: relative
	#fake::before
		content: ''
		position: absolute
		background-color: var(--akcentLight)
		width: 50%
		height: 50%
		top: 50%
		left: 50%
		transform: translate(-50%, -50%)
		opacity: 0
	input:checked + #fake::before
		opacity: 1

#acceptRule
	width: 2rem
	height: 2rem
</style>