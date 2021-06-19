import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import Sound from 'react-native-sound';

class AudioRecorderPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: 'null',
    };
  }

  startRecord = () => {
    console.log('Start record');
    console.log('PATH : ', AudioUtils.DocumentDirectoryPath);
    let folder = AudioUtils.DocumentDirectoryPath;
    let audioPath = folder + '/myFile.mp3';
    let options = {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'High',
      AudioEncoding: 'mp3',
      MeteringEnabled: true,
    };
    AudioRecorder.prepareRecordingAtPath(audioPath, options)
      .then(success => {
        console.log('prepareRecordingAtPath success : ', success);
        AudioRecorder.startRecording(success1 => {
          console.log('startRecording success : ', success1);
          this.setState({path: audioPath});
        }).catch(err1 => {
          console.log('startRecording err : ', err1);
        });
      })
      .catch(err => {
        console.log('prepareRecordingAtPath err: ', err);
      });
  };

  stopRecord = () => {
    console.log('Stop record');
    AudioRecorder.stopRecording();
  };

  playRecording = () => {
    console.log('Playing :', this.state.path);
    var whoosh = new Sound(
      '/data/user/0/com.voicerecorder/files/myFile.mp3',
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
        <TouchableOpacity onPress={this.startRecord}>
          <Text style={styles.button}>Start Recorder</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.stopRecord}>
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

export default AudioRecorderPlayer;
