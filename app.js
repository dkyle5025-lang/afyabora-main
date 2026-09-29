const path = require('path');

const appDir = path.join(__dirname, 'stitch_afyabora_health_management_system');
const serverEntry = path.join(appDir, 'server.js');

require(serverEntry);
