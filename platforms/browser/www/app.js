// JavaScript code for the BLE Scan example app.
// The code is inside a closure to avoid polluting the global scope.
//
evothings.loadScript('libs/evothings/rfduinoble/rfduinoble.js')
var rfduinoble = evothings.rfduinoble;;
(function() {

    // Dictionary of found devices.
    var devices = {}

    // Timer that updates the displayed list of devices.
    var updateTimer = null
    var timeoutTimer = null
    // Application object.
    var app = {};
    app.knownDevices = {};
    var R = 0;
    var G = 0;
    var B = 0;
    var sampleCount = 0;
    var dataArray = [
      //['Time', 'Steps', 'HR Median', 'HR Dev']
      ['Time', 'HR Median', 'HR Dev', 'Steps', 'Aux1', 'Aux2', 'Aux3']
      //d, obj.hr, obj.hrDev, obj.steps,obj.batt,obj.aux1,obj.aux2,obj.aux2
    ];
    var view;
    var dash;
    var configFile;
    var logFile;
    var historyObject = {};
    var logTimout;
    var clearFiles = false;
    // Connected device.
    app.device = null;
    app.fail = function(e) {
      console.log("FileSystem Error");
      console.dir(e);
    }
    app.checkFile = function() {
      // window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
      // 	console.log("got main dir", dir);
      // 	dir.getFile("log.txt", {
      // 		create: true
      // 	}, function(file) {
      // 		console.log("got the file", file);
      // 		logOb = file;
      // 		app.writeLog("App started");
      // 	});
      // });
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {

          console.log('file system open: ' + fs.name);
          fs.root.getFile("config.json", {
            create: true,
            exclusive: false
          }, function(fileEntry) {
            console.log("configfile is file?" + fileEntry.isFile.toString());
            // fileEntry.name == 'someFile.txt'
            // fileEntry.fullPath == '/someFile.txt'
            if (clearFiles) {
              app.writeFile(fileEntry, "{}");
            }
            configFile = fileEntry;
            //app.writeFile(fileEntry, null);
          }, app.fail);
          var exportDirectory = "";
          var subdir = "OpenHAK";
          // What directory should we place this in?
          if (cordova.file.documentsDirectory !== null) {
            // iOS, OSX
            exportDirectory = cordova.file.documentsDirectory;
          } else if (cordova.file.sharedDirectory !== null) {
            // BB10
            exportDirectory = cordova.file.sharedDirectory;
          } else if (cordova.file.externalRootDirectory !== null) {
            // Android, BB10
            exportDirectory = cordova.file.externalRootDirectory;
          } else {
            // iOS, Android, BlackBerry 10, windows
            exportDirectory = cordova.file.DataDirectory;
          }
          var fileName = "data.json"
          window.resolveLocalFileSystemURL(exportDirectory, function(directoryEntry) {
              console.log("Got directoryEntry. Attempting to open / create subdirectory:" + subdir);
              directoryEntry.getDirectory(subdir, {
                  create: true
                }, function(subdirEntry) {
                  subdirEntry.getFile(fileName, {
                      create: true
                    }, function(fileEntry) {
                      console.log("Got fileEntry for: " + fileName);
                        fileEntry.file(function(fileObj) {
                          console.log("Size = " + fileObj.size);
                          logFile = fileEntry;
                          if(fileObj.size>0){
                            google.setOnLoadCallback(function() {
                              //genSampleData(generateSamples)
                              app.loadHistory(fileEntry, historyObject);
                            });
                            //app.loadHistory(fileEntry, historyObject);
                          }
                        },errorHandler.bind(null, fileName))
                        //app.loadHistory(fileEntry, historyObject);
                        // fileEntry.createWriter(function (fileWriter) {
                        //     console.log("Got fileWriter");
                        //     // make your callback to write to the file here...
                        // }, errorHandler.bind(null, fileName));
                      }, errorHandler.bind(null, fileName));
                  }, errorHandler.bind(null, fileName));
              }, errorHandler.bind(null, fileName));
            //var fileEntry = window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory+"data.json");
            // fs.root.getFile("data.json", {
            //   create: true,
            //   exclusive: false
            // }, function(fileEntry) {
            //   console.log("logFile is file?" + fileEntry.isFile.toString());
            //   var fileData;
            //   readFromFile('data.json', function(data) {
            //     fileData = data
            //   })
            //   console.log(fileEntry.name)
            //   console.log("Log file Path:" + fileEntry.fullPath);
            //   logFile = fileEntry;
            //   if (clearFiles) {
            //     app.writeFile(fileEntry, "{}");
            //   }
            //   google.setOnLoadCallback(function() {
            //     //genSampleData(generateSamples)
            //     app.loadHistory(fileEntry, historyObject);
            //   });
            //
            //   //app.writeFile(fileEntry, null);
            // }, app.fail);
          }, app.fail);
      }
      var errorHandler = function(fileName, e) {
        var msg = ''

        switch (e.code) {
          case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'Storage quota exceeded'
            break
          case FileError.NOT_FOUND_ERR:
            msg = 'File not found'
            break
          case FileError.SECURITY_ERR:
            msg = 'Security error'
            break
          case FileError.INVALID_MODIFICATION_ERR:
            msg = 'Invalid modification'
            break
          case FileError.INVALID_STATE_ERR:
            msg = 'Invalid state'
            break
          default:
            msg = 'Unknown error'
            break
        }

        console.log('Error (' + fileName + '): ' + msg)
      }

      app.onErrorCreateFile = function() {
        console.log("Error creating file")
      }
      app.onErrorLoadFs = function() {
        console.log("Error loading FS");
      }
      app.writeFile = function(fileEntry, inputString, append) {
        // Create a FileWriter object for our FileEntry (log.txt).
        fileEntry.createWriter(function(fileWriter) {

          fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            app.readFile(fileEntry);
          };

          fileWriter.onerror = function(e) {
            console.log("Failed file write: " + e.toString());
          };

          // If data object is not passed in,
          // create a new Blob instead.
          // var dataStr = "{}"
          // if (inputString!==null) {
          // 	dataObj = new Blob([dataStr], {
          // 		type: 'text/plain'
          // 	});
          // } else {
          // 	dataObj = new Blob([inputString], {
          // 		type: 'text/plain'
          // 	});
          // }
          dataObj = new Blob([inputString], {
            type: 'text/plain'
          });
          if (append) {
            try {
              fileWriter.seek(fileWriter.length);
            } catch (e) {
              console.log("file doesn't exist!");
            }
          }
          fileWriter.write(dataObj);
        });
      }
      app.readFile = function(fileEntry, outgoingObject) {
        console.log("Start file read");
        fileEntry.file(function(file) {
          var reader = new FileReader();

          reader.onloadend = function() {
            var readObj = JSON.parse(this.result);
            console.log("Successful file read: " + JSON.stringify(readObj));
            outgoingObject = readObj;
            //displayFileData(fileEntry.fullPath + ": " + this.result);
          };

          reader.readAsText(file);

        }, app.fail);
      }
      app.loadHistory = function(fileEntry, outgoingObject) {
        console.log("Start file read");
        fileEntry.file(function(file) {
          var reader = new FileReader();

          reader.onloadend = function() {
            var readObj = JSON.parse(this.result);
            console.log("Successful file read: " + JSON.stringify(readObj));
            outgoingObject = readObj;
            for (var key in readObj) {
              if (!readObj.hasOwnProperty(key)) continue;

              var obj = readObj[key];
              var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
              d.setUTCSeconds(obj.epoch);
              dataArray.push([d, obj.hr, obj.hrDev, obj.steps, obj.aux1, obj.aux2, obj.aux3])
              dataArray.sort(sortFunction);
            }
            $.each(readObj, function() {
              //alert(this.id + " " + this.type);
              // var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
              // d.setUTCSeconds(this.epoch);
              // dataArray.push([d, this.hr, this.hrDev])
            });
            // if(Object.keys(readObj).length >= 0 && readObj.constructor === Object){
            // 	Object.keys(readObj).forEach(function(k){
            // 		var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
            // 		d.setUTCSeconds(k.epoch);
            // 		dataArray.push([d, k.hr, k.hrDev])
            // 	}
            // }
            console.log("Should draw chart");
            app.drawChart(dataArray);
            //displayFileData(fileEntry.fullPath + ": " + this.result);
          };

          reader.readAsText(file);

        }, app.fail);
      }
      app.writeLog = function(str) {
        if (!logOb) return;
        var log = str + " [" + (new Date()) + "]\n";
        console.log("going to log " + log);
        logOb.createWriter(function(fileWriter) {

          fileWriter.seek(fileWriter.length);

          var blob = new Blob([log], {
            type: 'text/plain'
          });
          fileWriter.write(blob);
          console.log("ok, in theory i worked");
          app.readAsText(logOb);
        }, app.fail);
      }
      app.scanStop = function() {
        console.log("stop scan");
        showMessage("Not Scanning");
        rfduinoble.stopScan();
      }
      app.scanStart = function() {
        console.log("scanning");
        showMessage("Scanning...");
        app.knownDevices = {};
        $("#deviceList").empty();
        rfduinoble.scan("OpenHAK",
          function(r) {
            if (app.knownDevices[r.address]) {
              return;
            }
            app.knownDevices[r.address] = r.address;
            //var res = r.rssi + " " + r.name + " " + r.kCBAdvDataLocalName;
            var res = r.rssi + " " + r.advertisementData.kCBAdvDataLocalName; //kCBAdvDataLocalName
            console.log('scan result: ' + JSON.stringify(r));
            var p = document.getElementById('deviceList');
            var li = document.createElement('li');
            var $a = $("<a class='device' href=\"#connected\">" + res + "</a>");
            $(li).append($a);
            $a.bind("click", {
                address: r.address,
                name: r.name,
                device: r
              },
              app.eventDeviceClicked);
            p.appendChild(li);
            //$("#deviceList").listview("refresh");
            console.log('found device: ' + r.name);
          })
      }
      app.sendTimeSync = function() {
        var d = new Date();
        var utc = Math.floor((new Date()).getTime() / 1000)
        console.log(utc);

        function toBytesInt32(num) {
          arr = new Uint8Array([
            (num & 0xff000000) >> 24,
            (num & 0x00ff0000) >> 16,
            (num & 0x0000ff00) >> 8,
            (num & 0x000000ff)
          ]);
          return arr;
        }
        var output = toBytesInt32(utc);
        // var utcBytes = bytesFromHex(utc.toString(),4);
        // console.log(utcBytes);
        //
        for (var i = 0; i < output.length; i++) {
          //output[i]=utcBytes[i]
          console.log(output[i])
        }
        //clearTimeout(offTimer);
        //console.log(output.toString());
        //var output = new Uint8Array(bytesFromHex(utc.toString(),6));
        app.device && app.device.writeDataArray(new Uint8Array([10, output[0], output[1], output[2], output[3]]));
        // offTimer = setTimeout(function(){
        // 	app.device && app.device.writeDataArray(new Uint8Array([R, G, B, 0x02, 0x05]));
        // },1500)
        // var myInt = data[3];
        // for(var i = data.length()-1; i > 0;i--){
        // 	myInt = myInt >> 8;
        // 	myInt = myInt & data[]
        // }
      };
      app.getHistory = function() {
        sampleCount = 0;
        // dataArray = [
        // 	//['Time', 'Steps', 'HR Median', 'HR Dev']
        // 	['Time', 'HR Median', 'HR Dev']
        // ];
        app.device && app.device.writeDataArray(new Uint8Array([3]));

      }
      app.drawChartBlank = function(data) {
        var d = new Date(0);
        dataArray.push([d, 0, 0, 0, 0, 0, 0]);
        app.drawChart(dataArray);
      }

      app.drawChart = function(data) {

        var chartdata = google.visualization.arrayToDataTable(data);

        var options = {
          title: 'Your Awesome Data',
          curveType: 'function',
          chartArea: {
            'width': '85%'
          },
          legend: {
            position: 'bottom'
          }
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        dash = new google.visualization.Dashboard(document.getElementById('dashboard'));
        var control = new google.visualization.ControlWrapper({
          controlType: 'ChartRangeFilter',
          containerId: 'control_div',
          options: {
            filterColumnIndex: 0,
            // ui: {
            //     chartOptions: {
            //         height: 50,
            //         width: 600,
            //         chartArea: {
            //             width: '80%'
            //         }
            //     }
            // }
          }
        });

        var chart = new google.visualization.ChartWrapper({
          chartType: 'LineChart',
          containerId: 'chart_div',
          title: 'Your Awesome Data',
          curveType: 'function',
          chartArea: {
            'width': '85%'
          },
          legend: {
            position: 'bottom'
          }
        });

        function setOptions(wrapper) {
          wrapper.setOption('width', "100%");
          wrapper.setOption('chartArea.width', '100%');
        }

        setOptions(chart);

        //['Time', 'HR Median', 'HR Dev', 'Steps', 'Aux1', 'Aux2', 'Aux3']
        view = new google.visualization.DataView(chartdata);
        view.hideColumns([3]);

        dash.bind([control], [chart]);
        dash.draw(view);
        google.visualization.events.addListener(control, 'statechange', function() {
          var v = control.getState();
          console.log("state change");
          document.getElementById('dbgchart').innerHTML = v.range.start + ' to ' + v.range.end;
          return 0;
        });
        $('#control_div').hide();
        //$("#filter_mobile").dateRangeSlider();
        control.draw();
        //data
        console.log(data[1][0]);
        console.log(data[data.length - 1][0]);
        $("#filter_mobile").dateRangeSlider({
          bounds: {
            min: data[1][0],
            max: data[data.length - 1][0]
          },
          defaultValues: {
            min: data[1][0],
            max: data[data.length - 1][0]
          },
        }).bind('valuesChanged', function(e, data) {
          control.setState({
            range: {
              start: data.values.min,
              end: data.values.max
            }
          });
          control.draw();
        });

        //chart.draw(data, options);
      }
      app.rfdHandler = function(rfdData) {
        clearTimeout(logTimout);
        sampleCount++;
        var myDataArray = new Uint8Array(rfdData);
        // Probably should do some maximum length tests for production someday.
        var myString = "Received Length: ";
        myString = myString + myDataArray.byteLength + " Bytes";
        app.logMessage(myString);

        myString = "HEX: ";
        for (i = 0; i < myDataArray.byteLength; i++) {
          myString = myString + " " + myDataArray[i].toString(16);
        }
        app.logMessage2(myString);
        //myString = "EPOCH: ";
        var epoch = evothings.util.bigEndianToUint32(myDataArray, 0)
        var steps = evothings.util.bigEndianToUint16(myDataArray, 4)
        var hr = evothings.util.littleEndianToUint8(myDataArray, 6);
        var hrDev = evothings.util.littleEndianToUint8(myDataArray, 7);
        var bat = evothings.util.littleEndianToUint8(myDataArray, 8);
        var aux1 = evothings.util.littleEndianToUint8(myDataArray, 9);
        var aux2 = evothings.util.littleEndianToUint8(myDataArray, 10);
        var aux3 = evothings.util.littleEndianToUint8(myDataArray, 11);
        var sampleObj = {
          "epoch": epoch,
          "steps": Number(steps),
          "hr": Number(hr),
          "hrDev": Number(hrDev),
          "batt": Number(bat),
          "aux1": Number(aux1) || 0,
          "aux2": Number(aux2) || 0,
          "aux3": Number(aux3) || 0
        }
        if (!isNaN(epoch)) {
          if (!historyObject.hasOwnProperty(epoch)) {
            historyObject[epoch] = sampleObj;
            console.log(JSON.stringify(historyObject));
            var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
            d.setUTCSeconds(epoch);
            //dataArray.push([d, hr, hrDev])
            dataArray.push([d, sampleObj.hr, sampleObj.hrDev, sampleObj.steps, sampleObj.aux1, sampleObj.aux2, sampleObj.aux3])
            dataArray.sort(sortFunction);
            if (dataArray.length > 3) {
              app.drawChart(dataArray);
            }
            console.log("sample time: " + epoch + " Steps: " + steps + " hr: " + hr + " hr dev: " + hrDev + " batt: " + (bat * 0.0165).toFixed(3) + " sample count: " + sampleCount);
            myString = "Time: " + app.timeConverter(epoch) + " Steps: " + steps + " HR Median: " + hr + " HR Dev: " + hrDev;
          }
          //new Date(Milliseconds)

          // Create a new JavaScript Date object based on the timestamp
          // multiplied by 1000 so that the argument is in milliseconds, not seconds.

          // for (i = 0; i < myDataArray.byteLength; i++) {
          // 	myString = myString + " " + String.fromCharCode(myDataArray[i]);
          // }

          //myString = myString + myDataArray[0];
          app.logReading("Time: " + app.timeConverter(epoch), "Total Steps: " + steps, "HR Median: " + hr, "HR Dev: " + hrDev, "Batt: " + (bat * 0.0165).toFixed(3));
          logTimout = setTimeout(function() {
            console.log(JSON.stringify(historyObject));
            app.writeFile(logFile, JSON.stringify(historyObject),true);
          }, 1000);
        }
      }
      app.eventDeviceClicked = function(event) {
        console.log("should be connecting");
        showMessage("Connecting...");
        //app.drawChartBlank();
        // rfduinoble.connect(event.data.device);
        rfduinoble.connect(event.data.device,
          function(result) {
            showMessage("Connected to " + event.data.device.advertisementData.kCBAdvDataLocalName);
            app.device = event.data.device;
            setTimeout(function() {
              app.sendTimeSync();
            }, 500);
            setTimeout(function() {
              app.getHistory();
            }, 750);
            app.device && app.device.readData(function(data) {
              //console.log(data.length);
              app.rfdHandler(data);
              //var epoch = (data[0] << 24) | (data[1] << 16) | (data[2] << 8) | data[3];
              //var epoch = new Uint32Array(data)[0];
              //console.log(uint);
              //app.logMessage('Data: ' + epoch);
            });
            app.device && app.device.subscribe(function(data) {
              //console.log(data.length);
              app.rfdHandler(data);
              //var epoch = (data[0] << 24) | (data[1] << 16) | (data[2] << 8) | data[3];
              //var epoch = new Uint32Array(data)[0];
              //console.log(uint);
              //app.logMessage('Data: ' + epoch);
            });
          },
          function(errorCode) {
            showMessage("Connect error: " + errorCode);
          });
      };

      // showMessage = function(info) {
      //   document.getElementById("info").innerHTML = info;
      // };
      app.logMessage = function(log) {
        document.getElementById("log").innerHTML = log;
      };
      app.logMessage2 = function(log) {
        document.getElementById("log2").innerHTML = log;
      };
      app.logReading = function(time, steps, hr, hrdev, batt) {
        document.getElementById("time").innerHTML = time;
        document.getElementById("steps").innerHTML = steps;
        document.getElementById("hr").innerHTML = hr;
        document.getElementById("hrdev").innerHTML = hrdev;
        document.getElementById("batt").innerHTML = batt;
        document.getElementById("sampleCount").innerHTML = "Sample count: " + sampleCount;
      };

      // Called when BLE and other native functions are available.
      app.onDeviceReady = function() {
        showMessage('Press "Scan" to find OpenHAKs');
      };

      app.disconnect = function() {
        console.log("close");
        rfduinoble.close();
        console.log("disconnect");
        showMessage("Disconnected");
      }
      app.connect = function() {
        console.log("close");
        rfduinoble.close();

        // Wait 500 ms for close to complete before connecting.
        setTimeout(function() {
            console.log("connecting");
            showMessage("Connecting...");
            rfduinoble.connect(
              "openhak",
              function(device) {
                console.log("connected");
                showMessage("Connected");
                app.device = device;
                app.device && app.device.subscribe(function(data) {
                  //console.log(data.length);
                  var uint = new Uint32Array(data)[0];
                  console.log(uint);
                  showMessage('Logging: CO2 ' + uint + "0 ppm");
                });
              },
              function(errorCode) {
                showMessage("Connect error: " + errorCode);
              });
          },
          500);
      };
      app.timeConverter = function(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        //var min = a.getMinutes();
        //var sec = a.getSeconds();
        var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
        var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
      }

      function main() {
        $(function() {
          // When document has loaded we attach FastClick to
          // eliminate the 300 ms delay on click events.
          FastClick.attach(document.body)

          // Event listener for Back button.
          $('.app-back').on('click', function() {
            history.back()
          })
        })

        // Event handler called when Cordova plugins have loaded.
        document.addEventListener(
          'deviceready',
          onDeviceReady,
          false)
        window.onbeforeunload = function(e) {
          rfduinoble.close();
        };
        google.charts.load('current', {
          'packages': ['corechart', 'controls', 'charteditor']
        });
        //google.setOnLoadCallback(drawChart);
        // google.setOnLoadCallback(function() {
        //   genSampleData(generateSamples)
        // });
      }

      function onDeviceReady() {
        app.checkFile();
        // Un-gray buttons.
        $('button.app-start-scan')
          .removeClass('mdl-button--disabled')
        // $('button.app-stop-scan')
        //   .removeClass('mdl-button--disabled')
        //   .addClass('mdl-color--deep-orange-900')

        // Attach event listeners.
        //['Time', 'HR Median', 'HR Dev', 'Steps', 'Aux1', 'Aux2', 'Aux3']
        $("#switch-1").click(function() {
          if ($('#switch-1').is('.is-checked')) {
            view.showColumns([1]);
            dash.draw(view);
          } else {
            if (view.getViewColumns().length > 3) {
              view.hideColumns([1]);
              dash.draw(view);
            }
          }
        });
        $("#switch-2").click(function() {
          if ($('#switch-2').is('.is-checked')) {
            view.setColumns([2]);
            dash.draw(view);
          } else {
            if (view.getViewColumns().length > 3) {
              view.hideColumns([2]);
              dash.draw(view);
            }
          }
        });
        $("#switch-3").click(function() {
          if ($('#switch-3').is('.is-checked')) {
            view.setColumns([4]);
            dash.draw(view);
          } else {
            if (view.getViewColumns().length > 3) {
              view.hideColumns([4]);
              dash.draw(view);
            }
          }
        });
        $("#switch-4").click(function() {
          if ($('#switch-4').is('.is-checked')) {
            view.setColumns([5]);
            dash.draw(view);
          } else {
            if (view.getViewColumns().length > 3) {
              view.hideColumns([5]);
              dash.draw(view);
            }
          }
        });
        $("#switch-5").click(function() {
          if ($('#switch-5').is('.is-checked')) {
            view.setColumns([6]);
            dash.draw(view);
          } else {
            if (view.getViewColumns().length > 3) {
              view.hideColumns([6]);
              dash.draw(view);
            }
          }
        });
        $('.app-start-scan').on('click', startScan)
        $('.app-stop-scan').on('click', stopScan)
        $('.generate-samples').on('click', function() {
          genSampleData(generateSamples)
        })
        //genSampleData(generateSamples);
      }

      function generateSamples(data) {
        app.drawChartBlank();
        console.log("calling back in generateSamples");
        //var sampleObj = genSampleData();
        var lastDay = -1;
        //console.log(JSON.stringify(sampleObj));
        var count = 0;
        for (var key in data) {
          if (!data.hasOwnProperty(key)) continue;
          var obj = data[key];
          //console.log(JSON.stringify(obj));
          count++;
          var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
          d.setUTCSeconds(obj.epoch);
          // var newSample = {
          //     "epoch": lastUtc, // unix timestamp
          //     "steps": currentSteps,
          //     "hr": getHR(maxHR),
          //     "hrDev": getHRDev(maxHRDev),
          //     "batt": currentBattVolts,
          //     "aux1": getAux(),
          //     "aux2": getAux(),
          //     "aux3": getAux()
          // }
          dataArray.push([d, obj.hr, obj.hrDev, obj.steps, obj.aux1, obj.aux2, obj.aux3])

          //console.log("sample time: " + obj.epoch + " Steps: " + obj.steps + " hr: " + obj.hr + " hr dev: " + obj.hrDev + " batt: " + (obj.batt * 0.0165).toFixed(3));
          //console.log(d.getDay());
          // if(d.getDay()!==lastDay){
          //     lastDay = d.getDay();
          //     console.log("New Day : "+d.toString()+" "+ getWeekNumber(d));
          // }
          //console.log(count);
          //dataArray.push([d, obj.hr, obj.hrDev])
        }
        app.drawChart(dataArray);
      }

      function sortFunction(a, b) {
        if (a[0] === b[0]) {
          return 0;
        } else {
          return (a[0] < b[0]) ? -1 : 1;
        }
      }

      function startScan() {
        // Make sure scan is stopped.
        stopScan(false)

        // Start scan.
        rfduinoble.scan("OpenHAK",
          function(r) {
            // if (devices[r.address]) {
            //   return;
            // }
            //app.knownDevices[r.address] = r.address;
            //var res = r.rssi + " " + r.name + " " + r.kCBAdvDataLocalName;
            var res = r.rssi + " " + r.advertisementData.kCBAdvDataLocalName; //kCBAdvDataLocalName
            //console.log('scan result: ' + JSON.stringify(r));
            r.timeStamp = Date.now()
            devices[r.address] = r;
          })


        // Start update timer.
        updateTimer = setInterval(updateDeviceList, 500)

        timeoutTimer = setTimeout(function() {
          stopScan(true)
        }, 30000)

        // Update UI.
        $('.mdl-progress').addClass('mdl-progress__indeterminate')
        showMessage('Scan Started')
      }

      function stopScan(showMessageText) {
        // Stop scan.
        evothings.ble.stopScan()

        // Clear devices.
        devices = {}

        // Stop update timer.
        if (updateTimer) {
          clearInterval(updateTimer)
          updateTimer = null
        }


        // Update UI.
        $('.mdl-progress').removeClass('mdl-progress__indeterminate')
        if (showMessageText)
          showMessage('Scan Stopped')
        //$('.app-cards').empty()
        hideDrawerIfVisible()

      }

      function hideDrawerIfVisible() {
        if ($('.mdl-layout__drawer').hasClass('mdl-layout__drawer is-visible')) {
          document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer()
        }
      }

      function showMessage(message) {
        document.querySelector('.mdl-snackbar').MaterialSnackbar.showSnackbar({
          message: message
        })
      }

      function updateDeviceList() {
        var timeNow = Date.now();

        $.each(devices, function(key, device) {
          // Only show devices that have been updated during the last 10 seconds.
          if (device.timeStamp + 10000 > timeNow) {
            displayDevice(device)
          } else {
            // Remove inactive device.
            removeDevice(device)
          }
        })
      }

      function displayDevice(device) {
        if (!deviceIsDisplayed(device)) {
          createDevice(device)
        }

        updateDevice(device)
      }

      function deviceIsDisplayed(device) {
        var deviceId = '#' + getDeviceDomId(device)
        //console.log(deviceId);
        return !!($(deviceId).length)
      }

      function updateDevice(device) {
        // Map the RSSI value to a width in percent for the indicator.
        var distanceBarValue = 100; // Used when RSSI is zero or greater.
        if (device.rssi < -100) {
          distanceBarValue = 1;
        } else if (device.rssi < 0) {
          distanceBarValue = 100 + device.rssi;
        }

        var deviceId = '#' + getDeviceDomId(device)

        $(deviceId + ' .device-rssi')
          .text(device.rssi)

        $(deviceId + ' .device-distance-bar')
          .css('width', distanceBarValue + 'px')

        if (!device.advertisementData) return

        $(deviceId + ' .device-kCBAdvDataLocalName')
          .text(device.advertisementData.kCBAdvDataLocalName)
        $(deviceId + ' .device-kCBAdvDataTxPowerLevel')
          .text(device.advertisementData.kCBAdvDataTxPowerLevel)
        $(deviceId + ' .device-kCBAdvDataIsConnectable')
          .text(device.advertisementData.kCBAdvDataIsConnectable)
        $(deviceId + ' .device-kCBAdvDataServiceUUIDs')
          .text(JSON.stringify(device.advertisementData.kCBAdvDataServiceUUIDs))
        $(deviceId + ' .device-kCBAdvDataServiceData')
          .text(JSON.stringify(device.advertisementData.kCBAdvDataServiceData))
      }

      function createDevice(device) {
        // Create HTML element to display device data.
        var domId = getDeviceDomId(device);
        var element = $(
          '<li id="' + domId + '" class="mdl-list__item">' +
          '<span class="mdl-list__item-primary-content">' +
          '<i class="material-icons  mdl-list__item-icon">watch</i>' +
          device.advertisementData.kCBAdvDataLocalName //+ " RSSI: "+ device.rssi
          +
          ' RSSI: <span class="device-rssi"></span>' +
          '</span>' +
          '<span class="mdl-list__item-secondary-action">' +
          '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-1">' +
          '<input type="checkbox" id="list-checkbox-' + domId + '" class="mdl-checkbox__input" />' +
          //'<input type="checkbox" id="list-checkbox-1" class="mdl-checkbox__input" />' +
          '</label>' +
          '</span>' +
          '</li>');
        $('.device-list').append(element);
        $("#list-checkbox-" + domId).change({
          address: device.address,
          name: device.name,
          device: device
        }, function(event) {
          //console.log("CHECKBOX CHANGE!");
          //console.log($(this)[0].checked);
          if ($(this)[0].checked) {
            //console.log("trying to connect");
            stopScan("Connecting...")
            app.eventDeviceClicked(event);
          }
        });
      }

      function removeDevice(device) {
        // Remove from UI.
        var deviceId = '#' + getDeviceDomId(device)
        $(deviceId).remove()

        // Delete from model.
        delete devices[devices.address]
      }

      function getDeviceDomId(device) {
        return 'device-dom-id-' + device.address.replace(/:/g, "_")
      }

      main()

    })();
