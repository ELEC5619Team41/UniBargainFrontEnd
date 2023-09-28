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
        AddEvent(){
            console.log("Add event")
            let calendarApi = this.$refs.calendar.getApi()
            calendarApi.addEvent({
                title: 'dynamic event',
                start: '2023-09-11T12:00:00',
                end: '2023-09-07T13:00:00',
            })
            this.calendarOptions.events.url = 'http://localhost:1828/05746f1a-d819-41b8-abeb-21a498419503.ics'
            calendarApi.render()
        }
    },
}
</script>
<template>
    <div>
        <FullCalendar ref="calendar" :options="calendarOptions" />
        <RoundCornerButton style="margin-top: 15px;" @button-click="AddEvent()"></RoundCornerButton>
    </div>
</template>