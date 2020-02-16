<template>
    <v-content mb-5>
        <v-autocomplete v-model="age" :items="ages" label="Επιλέξτε Ηλικιακή Ομάδα" class="mb-5" @change="loadAge"></v-autocomplete>
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
                        text: 'Πλήθος Τέκνων ανά Ηλικιακή Ομάδα Γυναικών'
                    },
                    xAxis: {
                        categories: ['Σύνολο', '0', '1', '2', '3', '4', '5', '6+']
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Πλήθος Τέκνων 2001',
                        data: [0, 0, 0, 0, 0, 0, 0, 0]
                    },{
                        name: 'Πλήθος Τέκνων 2011',
                        data: [0, 0, 0, 0, 0, 0, 0, 0]
                    }]
                },
                ages: [
                    
                ],
                age: "",
                json_records_2011: "",
                json_records_2001: "",
            }
        },
        created() {
            fetch("/2011_children_by_age_range.json")
                .then(r => r.json())
                .then(json => {
                    this.json_records_2011 = JSON.stringify(json);
                },
                response => {
                alert('Κάτι πήγε στραβά..'+response)
            }).then(() => {
                let age_records = JSON.parse(this.json_records_2011);
                for(let s in age_records.data) {
                    this.ages.push(age_records.data[s].range.trim());
                }
            });
            fetch("/2001_children_by_age_range.json")
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
            loadAge: function () {
                let records = JSON.parse(this.json_records_2011);
                for(let s in records.data) {
                    //console.log(records.data[s].state);
                    if(records.data[s].range.trim() == this.age){
                        var all_2011 = records.data[s].all.replace(/,/g,'');
                        var _0_2011 = records.data[s]._0.replace(/,/g,'');
                        var _1_2011 = records.data[s]._1.replace(/,/g,'');
                        var _2_2011 = records.data[s]._2.replace(/,/g,'');
                        var _3_2011 = records.data[s]._3.replace(/,/g,'');
                        var _4_2011 = records.data[s]._4.replace(/,/g,'');
                        var _5_2011 = records.data[s]._5.replace(/,/g,'');
                        var _6plus_2011 = records.data[s]._6plus.replace(/,/g,'');
                        break;
                    }
                }
                records = JSON.parse(this.json_records_2001);
                for(let s in records.data) {
                    //console.log(records.data[s].state);
                    if(records.data[s].range.trim() == this.age){
                        var all_2001 = records.data[s].all;
                        var _0_2001 = records.data[s]._0;
                        var _1_2001 = records.data[s]._1;
                        var _2_2001 = records.data[s]._2;
                        var _3_2001 = records.data[s]._3;
                        var _4_2001 = records.data[s]._4;
                        var _5_2001 = records.data[s]._5;
                        var _6plus_2001 = records.data[s]._6plus;
                        break;
                    }
                }
                this.chartOptions.series[0].data = [Number(all_2001), Number(_0_2001), Number(_1_2001), Number(_2_2001), Number(_3_2001), Number(_4_2001), Number(_5_2001), Number(_6plus_2001)];
                this.chartOptions.series[1].data = [Number(all_2011), Number(_0_2011), Number(_1_2011), Number(_2_2011), Number(_3_2011), Number(_4_2011), Number(_5_2011), Number(_6plus_2011)];
            },
        }
    }
</script>