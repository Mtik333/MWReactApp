// whoosh = new Sound(car.url, Sound.MAIN_BUNDLE, (error) => {
//     if (error) {
//       console.log('failed to load the sound', error);
//       return;
//     }
//     // loaded successfully
//     console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
//     whoosh.play((success) => {
//         if (success) {
//           console.log('successfully finished playing');
//         } else {
//           console.log('playback failed due to audio decoding errors');
//           // reset the player to its uninitialized state (android only)
//           // this is the only option to recover after an error occured and use the player again
//           whoosh.reset();
//         }
//       });
//   });

