<template>
  <div class="login-container">
    <el-card class="m-auto">
      <h2 class="text-3xl text-center mb-4">
        Login
      </h2>
      <el-form
        ref="loginForm"
        :model="form"
        :rules="rules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <el-form-item prop="email" label="Email">
          <el-input
            ref="email"
            v-model="form.email"
            placeholder="Email"
            name="email"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item prop="password" label="Password">
          <el-input
            ref="password"
            v-model="form.password"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            show-password
          />
        </el-form-item>
        <el-button :loading="isLoading" @click="onLogin" type="primary">
          Login
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "login",
  setup() {
    const router = useRouter();
    const isLoading = ref(false);
    const loginForm = ref(null);
    const form = ref({
      email: "",
      password: null
    });
    const rules = ref({
      email: [
        {
          required: true,
          message: "The email field is required",
          trigger: "blur"
        },
        {
          type: "email",
          message: "Please enter a correct email address",
          trigger: ["blur", "change"]
        }
      ],
      password: [
        {
          required: true,
          message: "The password field is required",
          trigger: "blur"
        },
        {
          min: 8,
          message: "The password length must be at least 8 characters",
          trigger: "blur"
        }
      ]
    });

    /**
     * @desc On login press
     */
    const onLogin = () => {

      loginForm.value.validate(valid => {
        if (valid) {
          _attemptLogin();
        } else {
          return false;
        }
      });
    };

    /**
     * @desc Attempt login
     * @private
     */
    const _attemptLogin = () => {
      isLoading.value = true;
      try {
        // Do Api Call here
        router.push({ name: "dashboard" });
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      loginForm,
      form,
      rules,
      onLogin
    };
  }
};
</script>

<style scoped></style>
