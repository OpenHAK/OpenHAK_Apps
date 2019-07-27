// File: rfduinoble.js

// Load dependent library EasyBLE.
evothings.loadScript('libs/evothings/easyble/easyble.js')

/**
 * @namespace
 * @author Patrik D.
 * @description <p>Functions for communicating with an RFduino board.</p>
 * <p>It is safe practise to call function {@link evothings.scriptsLoaded}
 * to ensure dependent libraries are loaded before calling functions
 * in this library.</p>
 */
evothings.rfduinoble = {};

;
(function() {
    // Internal functions.
    var internal = {};

    /**
     * Stops any ongoing scan and disconnects any connected devices.
     * @public
     */
    evothings.rfduinoble.stopScan = function() {
        evothings.easyble.stopScan();
        //evothings.easyble.closeConnectedDevices();
    };

    evothings.rfduinoble.close = function() {
        evothings.easyble.stopScan();
        evothings.easyble.closeConnectedDevices();
    };

    /**
     * Called when you have connected to the board.
     * @callback evothings.rfduinoble.connectsuccess
     * @param {evothings.rfduinoble.RFduinoBLEDevice} device -
     * The connected BLE shield.
     */

    /**
     * Connect to an RFduino board.
     * @param {evothings.rfduinoble.connectsuccess} success -
     * Success callback: success(device)
     * @param {function} fail - Error callback: fail(errorCode)
     * @public
     */
    evothings.rfduinoble.connect = function(device, success, fail) {
        console.log('connectToDevice');
        evothings.easyble.stopScan();
        internal.connectToDevice(device, success, fail);
        // evothings.easyble.startScan(
        // 	function(device)
        // 	{
        // 		//console.log('found device: ' + device.name);
        // 		if (device.name.includes(deviceName))
        // 		{
        //
        // 			// evothings.easyble.stopScan();
        // 			console.log('connectToDevice');
        // 			internal.connectToDevice(device, success, fail);
        // 		}
        // 	},
        // 	function(errorCode)
        // 	{
        // 		fail(errorCode);
        // 	});
    };

    evothings.rfduinoble.scan = function(deviceName, success, fail) {
        evothings.easyble.startScan(
            function(device) {
                //console.log('found device: ',device);
                if (device.advertisementData.kCBAdvDataLocalName !== null && typeof device.advertisementData.kCBAdvDataLocalName !== "undefined") {
                    if (device.advertisementData.kCBAdvDataLocalName.includes(deviceName) || device.advertisementData.kCBAdvDataLocalName.includes("Simblee")) {
                        //console.log('found device: ',device);
                        success(device);
                        // evothings.easyble.stopScan();
                        // console.log('connectToDevice');
                        // internal.connectToDevice(device, success, fail);
                    }
                }
            },
            function(errorCode) {
                console.log("Scan fail", errorCode);
                fail(errorCode);
            });
    }
    /**
     * Connect to the device.
     * @private
     */
    internal.connectToDevice = function(device, success, fail) {
        device.connect(
            function(device) {
                // Get services info.
                internal.getServices(device, success, fail);

            },
            function(errorCode) {
                fail(errorCode);
            });
    };

    /**
     * Read all services from the device.
     * @private
     */
    internal.getServices = function(device, success, fail) {
        device.readServices(
            null, // null means read info for all services
            function(device) {
                console.log(JSON.stringify(device));
                internal.addSubscribe(device);
								internal.addRead(device);
                internal.addMethodsToDeviceObject(device);
                //internal.subscribe(device);
                success(device);
            },
            function(errorCode) {
                fail(errorCode);
            });
    };

    /**
     * Add instance methods to the device object.
     * @private
     */
    internal.addMethodsToDeviceObject = function(device) {
        /**
         * Object that holds info about an RFduino device.
         * @namespace evothings.rfduinoble.RFduinoBLEDevice
         */

        /**
         * @function writeDataArray
         * @description Write data to an RFduino.
         * @param {Uint8Array} uint8array - The data to be written.
         * @memberof evothings.rfduinoble.RFduinoBLEDevice
         * @instance
         * @public
         */
        device.writeDataArray = function(uint8array) {
            // device.enableNotification(
            // 	'00002221-0000-1000-8000-00805f9b34fb',
            // function(data){
            // 	console.log('Got Stuff success ' + data);
            // },
            // function(errorCode){
            // 	console.log('writeCharacteristic error: ' + errorCode);
            // });
            device.writeCharacteristic(
                '2d30c083-f39f-4ce6-923f-3484ea480596',
                uint8array,
                function() {
                    console.log('writeCharacteristic success');
                },
                function(errorCode) {
                    console.log('writeCharacteristic error: ' + errorCode);
                });
        };
        // device.subscribe = function(){
        // 	// device.enableNotification('00002221-0000-1000-8000-00805f9b34fb',
        // 	// function(data){
        // 	// 	console.log('Got Stuff success ' + data);
        // 	// },
        // 	// function(errorCode){
        // 	// 	console.log('writeCharacteristic error: ' + errorCode);
        // 	// });
        // };
    };
    //'0000fe84-0000-1000-8000-00805f9b34fb:2d30c082-f39f-4ce6-923f-3484ea480596'
    internal.addSubscribe = function(device) {
        device.subscribe = function(callback) {
            console.log("Subscribe");
            device.enableNotification('2d30c082-f39f-4ce6-923f-3484ea480596',
                function(data) {
                    //var number = dataReader.readUInt16(data);
                    //console.log('Got Stuff success ' + data);
                    callback(data);
                },
                function(errorCode) {
                    console.log('writeCharacteristic error: ' + errorCode);
                });
        }
    }
    internal.addRead = function(device) {
        device.readData = function(callback) {
            console.log("Read");
            device.readCharacteristic('2d30c082-f39f-4ce6-923f-3484ea480596',
                function(data) {
                    //var number = dataReader.readUInt16(data);
                    //console.log('Got Stuff success ' + data);
                    callback(data);
                },
                function(errorCode) {
                    console.log('Read Characteristic error: ' + errorCode);
                });
        }
    }
})();
