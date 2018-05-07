<template>

	<div class="login">
		这是登录页面

		<el-form label-width="100px"
            :model="user" 
            ref="user"
            style="width: 450px;margin: 20px auto;">
			<el-form-item label="用户名" prop="user_id">
				<el-input v-model="user.name" class="name" placeholder="用户名">
				</el-input>
			</el-form-item>
			<el-form-item label="用户名">
				<el-input v-model="user.password" class="name" placeholder="密码">
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" class="name" @click="login">登录</el-button>
			</el-form-item>
		</el-form>


		<p>{{ token }}</p>
	</div>
	
</template>

<style lang="scss" type="text/css">
	.login{

		.name{
			width: 100px;
		}
	}
</style>

<script>

export default {
	data(){
		return {
			user: {
				name: null,
				password: null,
			},
		}
	},
	computed: {
        token() {
            return this.$store.state.login.token
        },
		// token: this.$store.state.token
	},
	mounted(){
		console.log(this.token)
	},
	methods: {
		login(){
			let token = `${this.user.name} ${this.user.password} ${JSON.stringify(new Date())}`

			this.$store.commit('CHANGE_TOKEN', token)
		},
	}
}


	
</script>