<template>

  <div style="display:flex; flex-direction: column">
    <div style="display: flex; flex-direction: row">
      <div class="column" v-for="(imageItem,index) in ImageSet" :key="index" style="margin-left: 10px">
        <img :src="imageItem.src" :alt=" 'photo'+index"  v-on:click="this.selectImage(index)" width="40" height="40">
      </div>
    </div>

    <div  v-if="CurrentImage!=='default'">
      <!-- Close the image -->
      <!-- Expanded image -->
      <img :src="this.CurrentImage" style="width: 500px">
      <!-- Image text -->
      <div id="imgtext"></div>
    </div>
  </div>



</template>

<script>
import SendRequestComponent from "@/components/Common/SendRequestComponent";

export default {
  name: "PictureViewer",
  components:{
    SendRequestComponent

  },
  props:{
    ItemId: String,
    ItemUrl: String
    // images:[
    //   {
    //     src:String,
    //     appendix:Object
    //   }
    // ]
  },
  methods:{
    selectImage(index)
    {
      const num = index;
      this.CurrentImage = this.ImageSet[num].src;
      console.log(num);
      // this.CurrentImage=this.image[index].src;
      console.log(this.ImageSet[index].src)
    },
    SendRequest() {

      fetch(this.ItemUrl, SendRequestComponent.method.Request(this.body));
    }
  },
  data(){
    return {
      CurrentImage: 'default',
      ImageSet:[
        {
          src:'../favicon.ico',
        },
        {
          src: '../1.webp',
        }
      ],
      body:[],
      // Property:this.props
    }
  },
  created() {
   this.SendRequest()
  }

}
</script>

<style scoped>



.column {
  float: left;
  width: 25%;
  padding: 10px;
}

/* Style the images inside the grid */
.column img {
  opacity: 0.8;
  cursor: pointer;
}

.column img:hover {
  opacity: 1;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* The expanding image container (positioning is needed to position the close button and the text) */
.container {
  position: relative;
}

/* Expanding image text */
#imgtext {
  position: absolute;
  bottom: 15px;
  left: 15px;
  color: white;
  font-size: 20px;
}

/* Closable button inside the image */
.closebtn {
  position: absolute;
  top: 10px;
  right: 15px;
  color: white;
  font-size: 35px;
  cursor: pointer;
}
</style>