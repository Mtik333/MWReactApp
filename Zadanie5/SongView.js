import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, TextInput, AsyncStorage, Image, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
var Sound = require('react-native-sound');

const AudioStatePlay = "play";
const AudioStatePause = "pause";
const AudioStateStop = "stop";

class SongView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            song: '',
            isPlaying: false,
            progress: 0
        };
        this.duration = 1;
        this.audioState = "";
        this.whoosh = null;
    }

    changePlayState() {
        if (!this.enable) return;
        if (this.state.isPlaying) {
            this.setState({ isPlaying: false });
            this.pause();
        } else {
            this.setState({ isPlaying: true });
            this.play();
        }
        this.enable = false;
        setTimeout(() => {
            this.enable = true;
        }, 500);
    }

    play() {
        if (this.whoosh && !this.state.isPlaying) {
            this.whoosh.getCurrentTime((seconds) => {
                this.whoosh.setCurrentTime(seconds);
                this.whoosh.play((success) => {
                    if (success) {
                        this.setState({ isPlaying: true });
                        this.stop();
                    }
                });
                this.audioState = AudioStatePlay;
                this.playProgress();
            });
            return;
        }
        this.whoosh = new Sound(this.state.song.url, null, (error) => {
            if (!error) {
                this.duration = this.whoosh.getDuration();
                this.whoosh.play((success) => {
                    if (success) {
                        this.setState({ isPlaying: true });
                        this.stop();
                    }
                });
                this.audioState = AudioStatePlay;
                this.playProgress();
            }
        });
    }

    pause() {
        this.audioState = AudioStatePause;
        if (!this.whoosh) return;
        this.whoosh.pause();
        this.clearTimer();
    }

    stop() {
        this.audioState = AudioStateStop;
        if (!this.whoosh) return;
        this.whoosh.stop();
        this.whoosh.release();
        this.whoosh = null;
        this.clearTimer();
        this.setState({ isPlaying: false });
    }

    increaseSound() {
        if (this.whoosh.getVolume()<1)
            this.whoosh.setVolume(this.whoosh.getVolume() + 0.1);
    }

    decreaseSound() {
        if (this.whoosh.getVolume()>0)
            this.whoosh.setVolume(this.whoosh.getVolume() - 0.1);
    }

    playProgress() {
        this.timer = setInterval(() => {
            this.whoosh.getCurrentTime((seconds) => {
                if (this.duration >= seconds && this.audioState === AudioStatePlay) {
                    this.setState({ progress: seconds });
                } else if (this.audioState === AudioStateStop) {
                    this.setState({ progress: 0 });
                }
            });
        }, 0);
    }

    clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    componentWillMount() {
        var song = this.props.navigation.state.params['song'];
        this.setState({ song: song });
    }

    returnToBase = () => {
        this.props
            .navigation
            .dispatch(NavigationActions.reset(
                {
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'SongsList' })
                    ]
                }));
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Play" onPress={() => { this.play() }}></Button>
                <Button title="Pause" onPress={() => { this.pause() }}></Button>
                <Button title="Stop" onPress={() => { this.stop() }}></Button>
                <Button title="Increase sound" onPress={() => { this.increaseSound() }}></Button>
                <Button title="Decrease sound" onPress={() => { this.decreaseSound() }}></Button>


                {this.whoosh && <Text>Debug info</Text> }
                {this.whoosh && <Text>Volume: {this.whoosh.getVolume().toFixed(2)}</Text>}
                {this.whoosh && <Text>Loops: {this.whoosh.getNumberOfLoops()}</Text>}
                {this.whoosh && <Text>Duration: {this.whoosh.getDuration().toFixed(2)}</Text>}
                
                <View style={{ padding: 20 }}>
                    <Button
                        onPress={() => { this.returnToBase() }}
                        style={styles.button}
                        title="Return to list"
                        theme='dark'
                        backgroundColor="#767653"
                        accessibilityLabel="Return"
                    />
                </View>
            </View>
        );
    }
}
const win = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    filter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        margin: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    },
    button: {
        flex: 0.2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        margin: 20,
        width: 50
    },
    image: {
        flex: 1,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        width: win.width,
        height: win.height / 2,
    },
    maintext: {
        margin: 5,
        fontSize: 20,
        padding: 5,
        fontWeight: 'bold'
    },
    lefttext: {
        padding: 10,
        color: "#C63B52",
        backgroundColor: '#F3E8E8'
    },
    lowertext: {
        padding: 10,
        color: "#3C23A1",
        fontWeight: 'bold',
        textAlign: 'right',
        alignSelf: 'stretch'
    }
});

export default SongView;
