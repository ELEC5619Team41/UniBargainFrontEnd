<template>
    <FullCalendar ref="inTextCalendar" :options="inTextCalendarOptions" style="background-color: rgb(244, 244, 244);">
    </FullCalendar>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import iCalendarPlugin from '@fullcalendar/icalendar'

export default {
    name: "InTextCalendar",
    components: {
        FullCalendar
    },
    data() {
        return {
            inTextCalendarOptions: {
                plugins: [timeGridPlugin, iCalendarPlugin],
                initialView: 'timeGridWeek',
                headerToolbar: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay' // user can switch between the two
                },
                events: {
                    format: 'ics',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    }
                }
            },
        }
    },
    props: {
        url: {
            type: String,
            default: ''
        }
    },
    mounted() {
        this.inTextCalendarOptions.events.url = this.url
        let calendarApi = this.$refs.inTextCalendar.getApi()
        calendarApi.render()
    },
}
</script>