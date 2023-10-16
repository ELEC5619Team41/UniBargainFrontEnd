<template>
    <div>
        <div style="margin-top: 20px;">
            <div style="display: flex; height: 500px; width: 100%; justify-content: space-between;">
                <div style="height: 500px; width: 500px; background-color: red; border-radius: 25px;"></div>
                <div class="contentField">
                    <div style="display: flex; height: 80px; align-items: center;">
                        <h1 style="width: 60%; text-align: left;">
                            {{ this.itemData.name }}
                        </h1>
                        <div style="width: 40%; display: flex; align-items: center; justify-content: space-around;">
                            <div style="width: 50px; height: 50px; background-color: green;"></div>
                            <div>{{ this.itemData.seller.username }}</div>
                            <div>{{ this.itemData.seller.rating }}</div>
                        </div>
                    </div>
                    <div class="description" :title="this.itemData.description">
                        {{ this.itemData.description }}
                    </div>
                    <div class="labelField" style="display: flex;">
                        <div v-for="(item) in this.itemData.labels" style="padding: 5px;">{{ item }}</div>
                    </div>
                    <div style="text-align: left; font-size: 50px;">
                        {{ this.itemData.price }}$
                    </div>
                    <div style="display: flex; justify-content: space-around;">
                        <RoundCornerButton style="width: 200px;" :text="$t('BuyNow')" @click="redirect()" ></RoundCornerButton>
                        <RoundCornerButton style="width: 200px;" :text="$t('AddToCart')" ></RoundCornerButton>
                    </div>
                </div>
            </div>
        </div>

        <div class="commentField" style="margin-top: 20px; padding-bottom: 5rem;">
            <ItemCommentComponent v-for="commentData in this.itemData.comments" :comment="commentData">
            </ItemCommentComponent>
        </div>
    </div>
</template>

<script>
import RoundCornerButton from '@/components/Common/RoundCornerButton.vue';
import ItemCommentComponent from '@/components/Item/ItemCommentComponent.vue';
import routes from '@/router/index';
export default {
    name: "ItemDetailPage",
    components: {
        RoundCornerButton,
        ItemCommentComponent,
    },
  methods:{
      redirect()
      {
        this.$router.push('/userhome/transactionpage')
      }
  },
    data() {
        return {
            itemData: {
                name: "Leather Bag",
                description: `
Introducing a timeless classic in the world of fashion and accessories - the exquisite leather bag. Crafted with precision and care, this leather bag embodies sophistication, versatility, and durability in every stitch and detail.

Constructed from premium, genuine leather, this bag boasts a rich, supple texture that exudes luxury. Its warm, earthy tones lend a touch of rustic charm, making it an ideal companion for any season or occasion. The leather has been meticulously treated to ensure both longevity and a soft, smooth feel to the touch.

The bag's design is a harmonious blend of form and function. Its spacious interior offers ample room for all your essentials, whether you're headed to the office, a weekend getaway, or a special evening out. Thoughtfully placed compartments and pockets help keep your belongings organized and easily accessible.

Carry this bag with grace using its sturdy leather handles or the detachable, adjustable shoulder strap for added convenience. The hardware and zippers are both durable and elegant, seamlessly integrating into the bag's overall design.

Elevate your style with this leather bag, a testament to craftsmanship and quality that will not only complement your ensemble but also become a cherished accessory for years to come. It's not just a bag; it's a statement of refined taste and enduring elegance.
`,
                price: 50,
                seller: {
                    username: "Username is long",
                    rating: 5.0
                },
                labels: [
                    "Hello",
                    "Hello",
                    "Hello",
                    "Hello",
                ],
                comments: [
                    {
                        "username": "Fashionista123",
                        "rating": 4.5,
                        "comment": "I recently got this leather bag, and I must say, it's a work of art! The craftsmanship is top-notch, and the attention to detail is impeccable. The genuine leather feels so luxurious, and the design is both stylish and practical. It's a classic piece that adds a touch of sophistication to any outfit.",
                        "date": "2023-09-18",
                        "commentRating": 4,
                        "images": ["", "", ""]
                    },
                    {
                        "username": "BagLover22",
                        "rating": 2.0,
                        "comment": "This leather bag is a disappointment! The craftsmanship is shoddy, and the attention to detail is lacking. The genuine leather feels cheap, and the design is neither stylish nor practical. It's a waste of money and definitely not worth the hype.",
                        "date": "2023-09-18",
                        "commentRating": 2,
                        "images": ["", "", ""]
                    },
                    {
                        "username": "TrendSetter99",
                        "rating": 3.0,
                        "comment": "I've been using this leather bag for a while now, and I expected better. The craftsmanship and attention to detail are subpar. The genuine leather feels average, and the design is far from stylish. It's an overrated accessory that doesn't live up to the expectations. Disappointed.",
                        "date": "2023-09-18",
                        "commentRating": 3,
                        "images": ["", "", ""]
                    },
                    {
                        "username": "ChicStyleDiva",
                        "rating": 2.5,
                        "comment": "Honestly, this leather bag falls short. The craftsmanship is not up to par, and the attention to detail is lacking. The genuine leather feels mediocre, and the design is far from classy. It's not worth the price tag, and I regret my purchase.",
                        "date": "2023-09-18",
                        "commentRating": 2,
                        "images": ["", "", ""]
                    },
                    {
                        "username": "LuxuryLover2023",
                        "rating": 3.0,
                        "comment": "I can't say I'm impressed with this leather bag. The craftsmanship and attention to detail are just okay. The genuine leather feels average, and the design is not as chic as I expected. It's not the elegant accessory I was hoping for. Disappointing.",
                        "date": "2023-09-18",
                        "commentRating": 3,
                        "images": ["", "", ""]
                    },
                    {
                        "username": "StyleIcon44",
                        "rating": 5.0,
                        "comment": "This leather bag is pure perfection! The craftsmanship and attention to detail are unparalleled. The rich, genuine leather is incredibly luxurious, and the design is the epitome of style and functionality. It's a timeless accessory that radiates sophistication. I'm absolutely in love with it!",
                        "date": "2023-09-18",
                        "commentRating": 5,
                        "images": ["", "", ""]
                    },
                    {
                        "username": "FashionForward77",
                        "rating": 4.0,
                        "comment": "I'm impressed with this leather bag! The craftsmanship and attention to detail are top-notch. The genuine leather feels great, and the design is quite stylish. It's a versatile accessory that adds a touch of elegance to any outfit. A solid choice for fashion-conscious individuals.",
                        "date": "2023-09-18",
                        "commentRating": 4,
                        "images": ["", "", ""]
                    },
                    {
                        "username": "BagEnthusiast1",
                        "rating": 5.0,
                        "comment": "This leather bag is a true masterpiece! The craftsmanship and attention to detail are exceptional. The rich, genuine leather feels luxurious, and the design strikes a perfect balance between style and functionality. It's a timeless accessory that exudes elegance and sophistication. A must-have for any fashion enthusiast!",
                        "date": "2023-09-18",
                        "commentRating": 5,
                        "images": ["", "", ""]
                    },
                    {
                        "username": "GlamourGuru55",
                        "rating": 2.0,
                        "comment": "I recently purchased this leather bag, and I'm disappointed with it! The craftsmanship and attention to detail are lacking. The genuine leather is not as sumptuous as expected, and the design is far from trendy. It's not the glamorous accessory I was hoping for. Not recommended!",
                        "date": "2023-09-18",
                        "commentRating": 2,
                        "images": ["", "", ""]
                    },
                    {
                        "username": "EleganceEve",
                        "rating": 4.7,
                        "comment": "This leather bag is an absolute gem! The craftsmanship and attention to detail are unmatched. The rich, genuine leather feels incredibly luxurious, and the design is the embodiment of elegance and functionality. It's a timeless piece that elevates any look. I couldn't be happier with my purchase!",
                        "date": "2023-09-18",
                        "commentRating": 5,
                        "images": ["", "", ""]
                    }
                ]
            }
        }
    },
}


</script>

<style scoped>
.description {
    height: 200px;
    width: 100%;

    text-align: left;
    color: rgb(50, 50, 5);
    overflow: hidden;
    text-overflow: ellipsis;

    display: -webkit-box;
    -webkit-line-clamp: 11;
    -webkit-box-orient: vertical;
    overflow: hidden;
}


/* 
.description:hover {
    overflow: visible;
    -webkit-line-clamp: unset;
    height: fit-content;
    position: absolute;
    max-width: 600px;
} */

.labelField>* {
    margin-left: 5px;
    margin-right: 5px;
    border: solid 1px black;
}

.contentField {
    height: 500px;
    width: calc(100% - 520px);
    justify-content: space-between;
    display: flex;
    flex-direction: column;
}

.contentField>* {
    margin-bottom: 5px;
}

.commentField>* {
    margin-bottom: 50px;
    /* border: solid 1px black; */

}
</style>
