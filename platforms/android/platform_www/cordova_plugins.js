cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-battery-status.battery",
        "file": "plugins/cordova-plugin-battery-status/www/battery.js",
        "pluginId": "cordova-plugin-battery-status",
        "clobbers": [
            "navigator.battery"
        ]
    },
    {
        "id": "cordova-plugin-ble.BLE",
        "file": "plugins/cordova-plugin-ble/ble.js",
        "pluginId": "cordova-plugin-ble",
        "clobbers": [
            "evothings.ble"
        ]
    },
    {
        "id": "cordova-plugin-camera.Camera",
        "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "id": "cordova-plugin-camera.CameraPopoverOptions",
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "id": "cordova-plugin-camera.camera",
        "file": "plugins/cordova-plugin-camera/www/Camera.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "id": "cordova-plugin-camera.CameraPopoverHandle",
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverHandle"
        ]
    },
    {
        "id": "cordova-plugin-chrome-apps-common.events",
        "file": "plugins/cordova-plugin-chrome-apps-common/events.js",
        "pluginId": "cordova-plugin-chrome-apps-common",
        "clobbers": [
            "chrome.Event"
        ]
    },
    {
        "id": "cordova-plugin-chrome-apps-common.errors",
        "file": "plugins/cordova-plugin-chrome-apps-common/errors.js",
        "pluginId": "cordova-plugin-chrome-apps-common"
    },
    {
        "id": "cordova-plugin-chrome-apps-common.stubs",
        "file": "plugins/cordova-plugin-chrome-apps-common/stubs.js",
        "pluginId": "cordova-plugin-chrome-apps-common"
    },
    {
        "id": "cordova-plugin-chrome-apps-common.helpers",
        "file": "plugins/cordova-plugin-chrome-apps-common/helpers.js",
        "pluginId": "cordova-plugin-chrome-apps-common"
    },
    {
        "id": "cordova-plugin-chrome-apps-sockets-tcp.sockets.tcp",
        "file": "plugins/cordova-plugin-chrome-apps-sockets-tcp/sockets.tcp.js",
        "pluginId": "cordova-plugin-chrome-apps-sockets-tcp",
        "clobbers": [
            "chrome.sockets.tcp"
        ]
    },
    {
        "id": "cordova-plugin-chrome-apps-sockets-tcpserver.sockets.tcpServer",
        "file": "plugins/cordova-plugin-chrome-apps-sockets-tcpserver/sockets.tcpServer.js",
        "pluginId": "cordova-plugin-chrome-apps-sockets-tcpserver",
        "clobbers": [
            "chrome.sockets.tcpServer"
        ]
    },
    {
        "id": "cordova-plugin-chrome-apps-sockets-udp.sockets.udp",
        "file": "plugins/cordova-plugin-chrome-apps-sockets-udp/sockets.udp.js",
        "pluginId": "cordova-plugin-chrome-apps-sockets-udp",
        "clobbers": [
            "chrome.sockets.udp"
        ]
    },
    {
        "id": "cordova-plugin-chrome-apps-system-network.system.network",
        "file": "plugins/cordova-plugin-chrome-apps-system-network/system.network.js",
        "pluginId": "cordova-plugin-chrome-apps-system-network",
        "clobbers": [
            "chrome.system.network"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-device-motion.Acceleration",
        "file": "plugins/cordova-plugin-device-motion/www/Acceleration.js",
        "pluginId": "cordova-plugin-device-motion",
        "clobbers": [
            "Acceleration"
        ]
    },
    {
        "id": "cordova-plugin-device-motion.accelerometer",
        "file": "plugins/cordova-plugin-device-motion/www/accelerometer.js",
        "pluginId": "cordova-plugin-device-motion",
        "clobbers": [
            "navigator.accelerometer"
        ]
    },
    {
        "id": "cordova-plugin-device-orientation.CompassError",
        "file": "plugins/cordova-plugin-device-orientation/www/CompassError.js",
        "pluginId": "cordova-plugin-device-orientation",
        "clobbers": [
            "CompassError"
        ]
    },
    {
        "id": "cordova-plugin-device-orientation.CompassHeading",
        "file": "plugins/cordova-plugin-device-orientation/www/CompassHeading.js",
        "pluginId": "cordova-plugin-device-orientation",
        "clobbers": [
            "CompassHeading"
        ]
    },
    {
        "id": "cordova-plugin-device-orientation.compass",
        "file": "plugins/cordova-plugin-device-orientation/www/compass.js",
        "pluginId": "cordova-plugin-device-orientation",
        "clobbers": [
            "navigator.compass"
        ]
    },
    {
        "id": "cordova-plugin-dialogs.notification",
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-dialogs.notification_android",
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-file.DirectoryEntry",
        "file": "plugins/cordova-plugin-file/www/DirectoryEntry.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.DirectoryEntry"
        ]
    },
    {
        "id": "cordova-plugin-file.DirectoryReader",
        "file": "plugins/cordova-plugin-file/www/DirectoryReader.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.DirectoryReader"
        ]
    },
    {
        "id": "cordova-plugin-file.Entry",
        "file": "plugins/cordova-plugin-file/www/Entry.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.Entry"
        ]
    },
    {
        "id": "cordova-plugin-file.File",
        "file": "plugins/cordova-plugin-file/www/File.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.File"
        ]
    },
    {
        "id": "cordova-plugin-file.FileEntry",
        "file": "plugins/cordova-plugin-file/www/FileEntry.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileEntry"
        ]
    },
    {
        "id": "cordova-plugin-file.FileError",
        "file": "plugins/cordova-plugin-file/www/FileError.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileError"
        ]
    },
    {
        "id": "cordova-plugin-file.FileReader",
        "file": "plugins/cordova-plugin-file/www/FileReader.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileReader"
        ]
    },
    {
        "id": "cordova-plugin-file.FileSystem",
        "file": "plugins/cordova-plugin-file/www/FileSystem.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileSystem"
        ]
    },
    {
        "id": "cordova-plugin-file.FileUploadOptions",
        "file": "plugins/cordova-plugin-file/www/FileUploadOptions.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileUploadOptions"
        ]
    },
    {
        "id": "cordova-plugin-file.FileUploadResult",
        "file": "plugins/cordova-plugin-file/www/FileUploadResult.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileUploadResult"
        ]
    },
    {
        "id": "cordova-plugin-file.FileWriter",
        "file": "plugins/cordova-plugin-file/www/FileWriter.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileWriter"
        ]
    },
    {
        "id": "cordova-plugin-file.Flags",
        "file": "plugins/cordova-plugin-file/www/Flags.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.Flags"
        ]
    },
    {
        "id": "cordova-plugin-file.LocalFileSystem",
        "file": "plugins/cordova-plugin-file/www/LocalFileSystem.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.LocalFileSystem"
        ],
        "merges": [
            "window"
        ]
    },
    {
        "id": "cordova-plugin-file.Metadata",
        "file": "plugins/cordova-plugin-file/www/Metadata.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.Metadata"
        ]
    },
    {
        "id": "cordova-plugin-file.ProgressEvent",
        "file": "plugins/cordova-plugin-file/www/ProgressEvent.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.ProgressEvent"
        ]
    },
    {
        "id": "cordova-plugin-file.fileSystems",
        "file": "plugins/cordova-plugin-file/www/fileSystems.js",
        "pluginId": "cordova-plugin-file"
    },
    {
        "id": "cordova-plugin-file.requestFileSystem",
        "file": "plugins/cordova-plugin-file/www/requestFileSystem.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.requestFileSystem"
        ]
    },
    {
        "id": "cordova-plugin-file.resolveLocalFileSystemURI",
        "file": "plugins/cordova-plugin-file/www/resolveLocalFileSystemURI.js",
        "pluginId": "cordova-plugin-file",
        "merges": [
            "window"
        ]
    },
    {
        "id": "cordova-plugin-file.isChrome",
        "file": "plugins/cordova-plugin-file/www/browser/isChrome.js",
        "pluginId": "cordova-plugin-file",
        "runs": true
    },
    {
        "id": "cordova-plugin-file.androidFileSystem",
        "file": "plugins/cordova-plugin-file/www/android/FileSystem.js",
        "pluginId": "cordova-plugin-file",
        "merges": [
            "FileSystem"
        ]
    },
    {
        "id": "cordova-plugin-file.fileSystems-roots",
        "file": "plugins/cordova-plugin-file/www/fileSystems-roots.js",
        "pluginId": "cordova-plugin-file",
        "runs": true
    },
    {
        "id": "cordova-plugin-file.fileSystemPaths",
        "file": "plugins/cordova-plugin-file/www/fileSystemPaths.js",
        "pluginId": "cordova-plugin-file",
        "merges": [
            "cordova"
        ],
        "runs": true
    },
    {
        "id": "cordova-plugin-geolocation.geolocation",
        "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
        "pluginId": "cordova-plugin-geolocation",
        "clobbers": [
            "navigator.geolocation"
        ]
    },
    {
        "id": "cordova-plugin-geolocation.PositionError",
        "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
        "pluginId": "cordova-plugin-geolocation",
        "runs": true
    },
    {
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    },
    {
        "id": "cordova-plugin-network-information.network",
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "id": "cordova-plugin-network-information.Connection",
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "cordova-plugin-vibration.notification",
        "file": "plugins/cordova-plugin-vibration/www/vibration.js",
        "pluginId": "cordova-plugin-vibration",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    },
    {
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification",
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification.js",
        "pluginId": "de.appplant.cordova.plugin.local-notification",
        "clobbers": [
            "cordova.plugins.notification.local",
            "plugin.notification.local"
        ]
    },
    {
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification.Core",
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification-core.js",
        "pluginId": "de.appplant.cordova.plugin.local-notification",
        "clobbers": [
            "cordova.plugins.notification.local.core",
            "plugin.notification.local.core"
        ]
    },
    {
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification.Util",
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification-util.js",
        "pluginId": "de.appplant.cordova.plugin.local-notification",
        "merges": [
            "cordova.plugins.notification.local.core",
            "plugin.notification.local.core"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-app-event": "1.2.1",
    "cordova-plugin-battery-status": "1.2.4",
    "cordova-plugin-ble": "2.0.1",
    "cordova-plugin-compat": "1.2.0",
    "cordova-plugin-camera": "2.4.1",
    "cordova-plugin-chrome-apps-common": "1.0.7",
    "cordova-plugin-chrome-apps-iossocketscommon": "1.0.2",
    "cordova-plugin-chrome-apps-sockets-tcp": "1.3.7",
    "cordova-plugin-chrome-apps-sockets-tcpserver": "1.2.4",
    "cordova-plugin-chrome-apps-sockets-udp": "1.3.0",
    "cordova-plugin-chrome-apps-system-network": "1.1.2",
    "cordova-plugin-console": "1.1.0",
    "cordova-plugin-device": "1.1.6",
    "cordova-plugin-device-motion": "1.2.5",
    "cordova-plugin-device-orientation": "1.0.7",
    "cordova-plugin-dialogs": "1.3.3",
    "cordova-plugin-file": "4.3.3",
    "cordova-plugin-geolocation": "2.4.3",
    "cordova-plugin-inappbrowser": "1.7.1",
    "cordova-plugin-network-information": "1.3.3",
    "cordova-plugin-statusbar": "2.2.3",
    "cordova-plugin-vibration": "2.1.5",
    "cordova-plugin-whitelist": "1.3.2",
    "de.appplant.cordova.plugin.local-notification": "0.8.5"
};
// BOTTOM OF METADATA
});