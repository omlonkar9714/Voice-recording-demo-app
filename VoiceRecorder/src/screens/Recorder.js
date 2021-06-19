import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// Import the react-native-sound module
import Sound from 'react-native-sound';
import SoundRecorder from 'react-native-sound-recorder';

class Recorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '',
    };
  }

  componentDidMount = () => {};

  onStartRecording = () => {
    SoundRecorder.start(SoundRecorder.PATH_CACHE + '/test.mp3').then(
      function () {
        console.log('started recording');
      },
    );
  };

  onStopRecording = async () => {
    SoundRecorder.stop().then(result => {
      console.log('stopped recording, audio file saved at: ' + result.path);
      this.setState({path: result.path});
    });
  };

  playRecording = () => {
    var whoosh = new Sound(this.state.path, Sound.MAIN_BUNDLE, error => {
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
    });
  };

  render() {
    return (
      <View style={styles.main}>
        <TouchableOpacity onPress={this.onStartRecording}>
          <Text style={styles.button}>Start Recorder</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onStopRecording}>
          <Text style={styles.button}>Stop Recorder</Text>
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

export default Recorder;
