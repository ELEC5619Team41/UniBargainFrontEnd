<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import RoundCornerButton from '../Common/RoundCornerButton.vue'
import iCalendarPlugin from '@fullcalendar/icalendar'
import { Calendar } from '@fullcalendar/core'


export default {
    name: "MyFullCalendar",
    components: {
        FullCalendar,
        RoundCornerButton,
        iCalendarPlugin
    },
    data() {
        return {
            calendarOptions: {
                plugins: [timeGridPlugin, iCalendarPlugin],
                initialView: 'timeGridWeek',
                headerToolbar: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay' // user can switch between the two
                },
                //backend should create calendar for all users at first and return the url when login
                events: {
                    // url: 'http://localhost:1828/05746f1a-d819-41b8-abeb-21a498419503.ics',
                    format: 'ics',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    }
                }
            }
        }
    },
    methods: {
        async previewImage(event) {

            var input = event.target;
            console.log('preview ' + input.files)
            if (input.files) {
                var reader = new FileReader();
                reader.onload = async (e) => {
                    console.log('selected')
                    this.preview = e.target.result;
                    let calendarApi = this.$refs.calendar.getApi()
                    this.calendarOptions.events.url = this.preview
                    await this.uploadTimetable(this.preview)
                    calendarApi.render()
                }
                reader.readAsDataURL(input.files[0]);

            }


        },
        async getTimetable() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow'
            };

            await fetch("http://localhost:28888/course/get", requestOptions).then(response => response.json()).then(result => {
                if (result['message'] == 'success') {

                    this.calendarOptions.events.url = result['data']['file']
                    let calendarApi = this.$refs.calendar.getApi()
                    calendarApi.render()
                }
            }).catch(error => console.log('error', error));
        },
        async uploadTimetable(file) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("username", this.$store.state.username);
            myHeaders.append("token", this.$store.state.token);

            var uploadData = { "file": file };

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(uploadData),
                redirect: 'follow'
            };

            await fetch("http://localhost:28888/course/set", requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.log('error', error));
        }
    },
    mounted() {
        this.getTimetable()
    }
}


</script>
<template>
    <div>
        <FullCalendar ref="calendar" :options="calendarOptions" />

        <div style="width: 100%; display: flex; align-items: center; justify-content: center; padding-bottom:70px;">
            <div 
                style="display: flex; background-color: #7dd1df; color:white; width: 200px; height: 50px; align-items: center; justify-content: center; margin-top: 10px; border-radius: 10px;">
                <div>{{$t('UploadNewTimetable')}}</div>
                <input type="file" accept="text\calendar" @change="previewImage" style="opacity: 0; position: absolute;" />
                
            </div>
        </div>
    </div>
</template>