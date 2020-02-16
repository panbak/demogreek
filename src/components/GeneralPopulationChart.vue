<template>
    <v-content mb-5>
        <v-autocomplete v-model="state" :items="states" label="Επιλέξτε Δήμο" class="mb-5" @change="loadState"></v-autocomplete>
        <highcharts :options="chartOptions" :updateArgs="updateArgs" id="highchartdemo"></highcharts>
    </v-content>
</template>
<style scoped>
    @media (min-width: 1281px) {
        #highchartdemo {
            width: 1000px !important;
        }
    }
    @media (max-width: 1260px) {
        #highchartdemo {
            width: 100% !important;
        }  
    }
</style>
<script>
    export default {
        data() {
            return {
                updateArgs: [true, true, {duration: 1000}],
                chartOptions: {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Γενικά Στοιχεία Πληθυσμού'
                    },
                    xAxis: {
                        categories: ['Σύνολο Πληθυσμού 2001-2011', 'Σύνολο Ανδρών 2001-2011', 'Σύνολο Γυναικών 2001-2011']
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: '2001',
                        data: [0, 0, 0]
                    }, {
                        name: '2011',
                        data: [0, 0, 0]
                    }]
                },
                states: [
                    "ΣΥΝΟΛΟ ΧΩΡΑΣ",
                ],
                state: "",
                json_records_2011: "",
                json_records_2001: "",
            }
        },
        created() {
            fetch("/2011_population_greece.json")
                .then(r => r.json())
                .then(json => {
                    this.json_records_2011 = JSON.stringify(json);
                },
                response => {
                alert('Κάτι πήγε στραβά..'+response)
            }).then(() => {
                let state_records = JSON.parse(this.json_records_2011);
                for(let s in state_records.data) {
                    this.states.push(state_records.data[s].state.trim());
                }
            });
            fetch("/2001_population_greece.json")
                .then(r => r.json())
                .then(json => {
                    this.json_records_2001 = JSON.stringify(json);
                },
                response => {
                alert('Κάτι πήγε στραβά..'+response)
            });
        },
        mounted() {
            
        },
        methods: {
            loadState: function () {
                //console.log(this.state);
               // console.log(JSON.parse(this.json_records_2011));
                //this.chartOptions.series[1].data = [5, 600000, 7];
                let records = JSON.parse(this.json_records_2011);
                let found = 0;
                for(let s in records.data) {
                    //console.log(records.data[s].state);
                    if(records.data[s].state.trim() == this.state){
                        found++;
                        var all_2011 = records.data[s].all.replace(/,/g,'');
                        var women_2011 = records.data[s].women.replace(/,/g,'');
                        var men_2011 = records.data[s].men.replace(/,/g,'');
                        //console.log(all_2011 +","+women_2011+","+men_2011);
                        break;
                    }
                }
                records = JSON.parse(this.json_records_2001);
                for(let s in records.data) {
                    //console.log(records.data[s].state);
                    if(records.data[s].state.trim() == this.state){
                        found++;
                        var all_2001 = records.data[s].all.replace(/,/g,'');
                        var women_2001 = records.data[s].women.replace(/,/g,'');
                        var men_2001 = records.data[s].men.replace(/,/g,'');
                        break;
                    }
                }
                if(found==2){
                    this.chartOptions.series[1].data = [Number(all_2011), Number(men_2011), Number(women_2011)];
                    this.chartOptions.series[0].data = [Number(all_2001), Number(men_2001), Number(women_2001)];
                }else{
                    this.chartOptions.series[1].data = [0, 0, 0];
                    this.chartOptions.series[0].data = [0, 0, 0];
                    alert("Δεν υπάρχουν δεδομένα και για τις 2 χρονιές.");
                }
            },
        }
    }
</script>