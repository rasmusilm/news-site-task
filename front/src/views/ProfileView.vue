<template>
    <h2>
        My Profile
    </h2>
    <template v-if="!editMode">
        <div class="row">
            <span class="column title">Name </span><span class="column">{{ this.represent(identity.name) }}</span>
        </div>
        <div class="row">
            <span class="column title">E-mail </span><span class="column">{{ this.represent(identity.email) }}</span>
        </div>
        <div class="row">
            <span class="column title">API key </span><span class="column">{{ this.represent(identity.apikey) }}</span>
        </div>
        <div class="row lower">
            <div class="column"></div><div class="column"><span class="button" @click="changeMode()">Edit</span></div>
        </div>
    </template>
    <template v-else>
        <div class="row" >
            <span class="column title">Name </span><span class="column"><input v-model="newName" /></span>
        </div>
        <div class="row">
            <span class="column title">E-mail </span><span class="column"><input v-model="newEmail" /></span>
        </div>
        <div class="row">
            <span class="column title">API key </span><span class="column"><input v-model="newApiKey" /></span>
        </div>
        <div class="row lower">
            <div class="column"><span class="button" @click="changeMode(true)">Cancel</span></div>
            <div class="column"><span class="button" @click="changeMode()">Save</span></div>
        </div>
    </template>


</template>

<script>
import {Vue} from "vue-class-component";
import {useIdentityStore} from "@/stores/identity";
import representUnknown from "@/services/utility";

export default class ProfileView extends Vue {
    identity = useIdentityStore();
    editMode = false;
    newName = "";
    newEmail = "";
    newApiKey = "";
    represent(value) {
        return representUnknown(value);
    };
    changeMode(cancel = false) {
        if (this.editMode && !cancel) {
            this.identity.setAPIKey(this.newApiKey);
            this.identity.setName(this.newName);
            this.identity.setEmail(this.newEmail)
            this.identity.updateLocalStorage();
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
}

.column {
    float: left;
    width: 15%;
}

.lower {
    padding-top: 10px;
}

.title {
    font-weight: bold;
}

.button {
    background-color: #bebec2;
}
</style>