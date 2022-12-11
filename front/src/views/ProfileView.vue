<template class="flex-container">
    <div class="content">
        <h2>
            My Profile
        </h2>
        <template v-if="!editMode">
            <div class="row">
                <span class="column title">Name </span><span class="column value-column">{{ this.represent(identity.name) }}</span>
            </div>
            <div class="row">
                <span class="column title">E-mail </span><span class="column value-column">{{ this.represent(identity.email) }}</span>
            </div>
            <div class="row">
                <span class="column title">API key </span><span class="value-column column">{{ this.represent(identity.apikey) }}</span>
            </div>
            <div class="row lower">
                <div class="column"></div><div class="column"><span class="button" @click="changeMode()">Edit</span></div>
            </div>
        </template>
        <template v-else>
            <div class="row" >
                <span class="column title">Name </span><span class="column value-column"><input v-model="newName" /></span>
            </div>
            <div class="row">
                <span class="column title">E-mail </span><span class="column value-column"><input v-model="newEmail" /></span>
            </div>
            <div class="row">
                <span class="column title">API key </span><span class="column value-column"><input v-model="newApiKey" /></span>
            </div>
            <div class="row lower">
                <div class="button-container column"><span class="button" @click="changeMode(true)">Cancel</span></div>
                <div class="button-container column"><span class="button" @click="changeMode()">Save</span></div>
            </div>
        </template>
    </div>
</template>

<script>
import {Vue} from "vue-class-component";
import {useIdentityStore} from "@/stores/identity";
import representUnknown from "@/services/utility";
import {UserApi} from "@/services/simulated/userApi";
import User from "@/domain/User";

export default class ProfileView extends Vue {
    identity = useIdentityStore();
    editMode = false;
    identityService = new UserApi();
    newName = "";
    newEmail = "";
    newApiKey = "";

    beforeMount() {
        this.identityService.getUserData();
    }

    represent(value) {
        return representUnknown(value);
    };

    changeMode(cancel = false) {
        if (this.editMode && !cancel) {
            this.identity.setAPIKey(this.newApiKey);
            this.identity.setName(this.newName);
            this.identity.setEmail(this.newEmail)
            this.identity.updateLocalStorage();
            this.identityService.update(new User(this.identity.name, this.identity.apikey, this.identity.name));
        } else if (!this.editMode) {
            this.newApiKey = this.identity.apikey;
            this.newName = this.identity.name;
            this.newEmail = this.identity.email;
        }
        console.log("mode changed");
        this.editMode = !this.editMode;
    }
}
</script>

<style scoped>

.row {
    display: flex;
    padding-top: 6px;
    margin-left: 5%;
}

.column {
    float: left;
    width: 6rem;
    min-width: 5rem;
    max-width: 15%;
}

.value-column {
    min-width: fit-content;
    max-width: 20rem;
}

.lower {
    padding-top: 1rem;
}

.title {
    font-weight: bold;
}

.button {
    background-color: #bebec2;
}

.button-container {
    width: 8rem;
}
</style>