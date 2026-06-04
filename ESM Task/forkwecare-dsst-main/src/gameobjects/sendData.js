export default async function sendData() {
        // Connect to Pavlovia
    let timeline = []
    var pavlovia_init = {
        type: jsPsychPavlovia,
        command: "init",
        participantId: PARTICIPANT_ID,
        on_start: function() {
            console.log("Saving data...");
        }
    }
    timeline.push(pavlovia_init)

    // Send data
    var pavlovia_finish = {
        type: jsPsychPavlovia,
        command: "finish",
        participantId: PARTICIPANT_ID,
        on_finish: function() {
            console.log("Data saved to Pavlovia");
            window.top.postMessage("surveyDone", "https://run.pavlovia.org/"); // Post message to Pavlovia experiment
            return;
        }
    };
    timeline.push(pavlovia_finish);

    // Execute timeline (connecting and sending)
    jsPsych.run(timeline);
}