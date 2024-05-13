<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Challenge } from '@/interfaces/challenge';
import { getChallengeById } from '@/api/challenge';
const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
});
const challenge = ref<Challenge>({
    id:props.id,
    description:"",
    image_url:"",
    round_id:props.id,
    is_valid:true

});
const apiURL = ref<String|null|undefined>(import.meta.env.VITE_IMAGE_URL);

const getServerURL=(image_url:any=0)=>{
    console.log(process.env.VITE_IMAGE_URL)
    return import.meta.env.VITE_IMAGE_URL+image_url
}

const findChallengeById = async (id: number) => {
    const res = await getChallengeById(id);
    challenge.value = res;
    console.log(res)
}

onMounted(() => { 
    findChallengeById(props.id);
})
</script>
<template>

    <v-container fluid>
        <v-row>
            <v-col cols="6">
                <!-- Description -->
                <div id="description-box" class="challenge-box">
                    <h2>挑戰 {{ props.id }}</h2>
                    <h3>描述</h3>
                    {{ challenge?.description }}
                    <h3>圖片</h3>
                    <img :src=getServerURL(challenge.image_url) :alt=challenge.image_url>
                </div>
            </v-col>
            <v-col cols="6">
                <!-- Coding -->
                <div class="challenge-box" id="coding-box">
                    <h3>程式碼</h3>
                </div>

                <!-- <v-textarea class="challenge-box" label="Code"  auto-grow shaped></v-textarea> -->
                <div id="bar-box">
                </div>
                <div id="button-box" class="challenge-box">
                    <h3>按鈕區</h3>
                    <v-btn color="warning">重制</v-btn>
                    <v-btn color="success">提交</v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<style>
.challenge-box{
    border-radius: 5px;
    border: black 1px solid;
    padding: 2% 5%;
}

#description-box{
    height: 95vh;
}
#coding-box{
    height: 85vh;
}

#bar-box{
    height: 1vh;
}
#button-box{
    height: 9 vh;
}
</style>