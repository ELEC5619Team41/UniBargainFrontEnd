<template>
    <div>

        <div class="commentField">
            <el-form :model="form" label-width="120px">

                <el-form-item label="Item Rating">
                    <el-input v-model="this.form.rating" :type="'number'" :min="1" :max="5"/>
                </el-form-item>

                <el-form-item label="Your Comment">
                    <el-input v-model="this.form.description" type="textarea" :autosize="true" />
                </el-form-item>

            </el-form>
        </div>
        <div style=" display: flex; align-items: center; justify-content: space-between; flex-direction: row-reverse;">
            <!-- <div style="width: 50%; font-size: 45px;">{{ $t('TellUsYourFeelings') }}</div> -->
            <div>
                <RoundCornerButton :width="'50px'" @button-click="Submit" :text="$t('Post')"></RoundCornerButton>
            </div>
        </div>

    </div>
</template>
<script>
import RoundCornerButton from "@/components/Common/RoundCornerButton";
import AddressBlockComponent from "@/components/UserProfile/AddressBlockComponent";
import FileUploadComponent from "@/components/Common/FileUploadComponent";

export default {
    name: "ItemCommentInputComponent",
    components: { FileUploadComponent, AddressBlockComponent, RoundCornerButton },
    methods: {
        receiveEmit(input) {
            console.log('add image')
            this.form.images.push(input);
        },
        async Submit() {

            if (this.form.description == '') {
                alert("Please fill in all the information");
                return;
            }
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var data = {
                id: this.info.id,
                evaluate: this.form.description,
                score: this.form.rating
            };


            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: 'follow'
            };

            //api here

            fetch("http://localhost:28888/buyProduct/setEvaluate", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result)
                    // this.$router.go()
                })
                .catch(error => console.log('error', error));
            
            this.$router.push({
                path:'itemdetailpage/'+this.info.productId
            })
        }
    },
    data() {
        return {
            form: {
                rating: 1,
                description: '',
                images: [],
            },
        }
    },
    props:{
        info: {
            type: Object,
            required: true
        }
    }
}
</script>
  
<style scoped>
.item-basic-info {
    display: flex;
    flex-direction: row;

}

.commentField {
    align-items: left;
    width: 100%;
    height: 100px;
    margin-bottom: 5px;
    margin-top: 5px;
}

.item-basic-info-element {
    display: flex;
    flex-direction: column;
    border: gray 2px solid;
    border-radius: 10px;
    margin-left: 10%;
    width: 200px;
}

.info-input {
    border-radius: 5px;
    height: 20px;
    border: 1px gray solid;
    margin-bottom: 15px;
    margin-left: 15px;
    margin-right: 15px;

}

.division_basic_info {}

.division {
    /*border: gray solid;*/
    margin-top: 15px;
}

.el-row {
    margin-bottom: 20px;
}
</style>