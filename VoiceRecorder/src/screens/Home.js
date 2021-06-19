import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import AudioRecord from 'react-native-audio-record';

// Import the react-native-sound module
import Sound from 'react-native-sound';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const options = {
      sampleRate: 16000, // default 44100
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 16, // 8 or 16, default 16
      audioSource: 6, // android only (see below)
      wavFile: 'test.mp3', // default 'audio.wav'
    };
    AudioRecord.init(options);
  }

  onStartRecording = () => {
    console.log('Start');
    AudioRecord.start();
  };

  onStopRecording = async () => {
    console.log('Stop');
    AudioRecord.stop();
    // or to get the wav file path
    let audioFile = await AudioRecord.stop();
    console.log('File : ', audioFile);
  };

  playRecording = () => {
    console.log('Play');
    // var whoosh = new Sound(
    //   '/data/user/0/com.voicerecorder/files/test.wav',
    //   Sound.MAIN_BUNDLE,
    //   error => {},
    // );

    // Load the sound file 'whoosh.mp3' from the app bundle
    // See notes below about preloading sounds within initialization code below.
    var whoosh = new Sound(
      '/data/user/0/com.voicerecorder/files/test.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // loaded successfully
        console.log(
          'duration in seconds: ' +
            whoosh.getDuration() +
            'number of channels: ' +
            whoosh.getNumberOfChannels(),
        );

        // Play the sound with an onEnd callback
        whoosh.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      },
    );
  };

  render() {
    return (
      <View style={styles.main}>
        <TouchableOpacity onPress={this.onStartRecording}>
          <Text style={styles.button}>Start Recording</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onStopRecording}>
          <Text style={styles.button}>Stop Recording</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.playRecording}>
          <Text style={styles.button}>Play Recording</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    fontSize: 20,
    backgroundColor: 'black',
    color: 'white',
    padding: 20,
    borderRadius: 20,
    margin: 20,
  },
  main: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Home;
