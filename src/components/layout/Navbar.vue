<template>
  <div class="navbar fixed">
    <div class="navbar-breadcrumb">
      <Breadcrumb />
    </div>
    <div class="navbar-inner">
      <div class="navbar-inner__content">
        <!--Global search-->
        <LanguageSelect />
        <!--Avatar-->
        <el-dropdown
          class="avatar-container ml-2"
          trigger="hover"
          @command="onMenuClick"
        >
          <el-avatar v-if="user && user.picture" :src="user.picture" />
          <el-avatar v-else>
            {{ user ? `${user.name.charAt(0)}${user.surname.charAt(0)}` : null }}
          </el-avatar>
          <!--Dropdown Options-->
          <el-dropdown-menu
            slot="dropdown"
            class="user-dropdown"
          >
            <router-link to="/profile">
              <el-dropdown-item>
                Profilo
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item command="change-password">
              Cambia Password
            </el-dropdown-item>
            <el-dropdown-item
              divided
              @click.native="logout"
            >
              <span style="display:block;">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/layout/Breadcrumb";
import LanguageSelect from "@/components/LanguageSelect";
import authService from "@/modules/auth/Services/auth.services";
import ChangePasswordForm from "@/components/forms/ChangePasswordForm";

export default {
  name: "Navbar",
  components: {
    Breadcrumb, LanguageSelect
  },
  data() {
    return {
      modal: null
    };
  },
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    }
  },
  methods: {
    onMenuClick(command) {
      if (command === "change-password") {
        this._changePassword();
      }
    },
    /**
     * @desc On change password
     */
    _changePassword() {
      this.modal = this.$modal.open("Cambia password", ChangePasswordForm, {}, this._onChangePasswordConfirm);
    },
    /**
     * @desc On change password confirmation
     */
    async _onChangePasswordConfirm() {
      this.isLoading = true;
      this.modal.startLoading();

      try {
        let data = this.modal.getData();
        await authService.changePassword(this.user.id, data);
        this.$message.success("Password aggiornata");
        this.modal.close();
      } catch (error) {
        this.$message.error("Si è verificato un errore durante il cambio password!");
      } finally {
        this.modal.stopLoading();
        this.isLoading = false;
      }
    },
    /**
     * @desc Make logout
     * @returns {Promise<void>}
     */
    async logout() {
      await authService.logout();
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>

.navbar {
  height: $navbar-height;
  @apply overflow-hidden;
  @apply relative;
  @apply bg-white;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  @apply z-10;
  @apply w-full;
  @apply flex;
  @apply justify-end;
  transition: width 0.28s;

  &-breadcrumb {
    @apply m-auto;
    @apply absolute;
    @apply content-center;
    @apply flex;
    @apply items-center;
    @apply h-full;
    left: 1rem;
  }

  &-inner {
    @apply flex;
    @apply flex-row;
    @apply relative;
    padding-left: 1rem;
    padding-right: 1rem;
    @apply content-end;
    @apply bg-white;
    @apply border-l;

    &__content {
      @apply flex;
      @apply flex-row;
      @apply w-full;
      @apply content-end;
      @apply items-center;
      @apply bg-white;
    }
  }

  &.fixed {
    width: calc(100% - #{$sidebar-width});
    @apply fixed;
    @apply top-0;
    @apply right-0;
  }
}
</style>
