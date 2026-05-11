function sendData(data) {
        // Connect to Pavlovia
    let timeline = []
    var pavlovia_init = {
        type: jsPsychPavlovia,
        command: "init"
    }
    timeline.push(pavlovia_init)

    // Send data
    var pavlovia_finish = {
        type: jsPsychPavlovia,
        command: "finish",
    };
    timeline.push(pavlovia_finish);

    // Execute timeline (connecting and sending)
    jsPsych.run(timeline);
}