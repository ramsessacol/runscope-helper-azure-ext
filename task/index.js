"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
const runscopeRequirements = "https://gist.githubusercontent.com/ramsessacol/37132d91eeb93a32e1067617c34bf98b/raw";
const runscopeAppPython = "https://gist.githubusercontent.com/ramsessacol/3ee9bbd2009230630cf3ba8c32f83bb9/raw/2cc2da622da3ffab2340c1db29a6364e2987a902";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // get inputs
            var triggerUrl = tl.getInput('triggerUrl', true);
            var accessToken = tl.getInput('accessToken', true);
            // install tools
            yield tl.exec('pip3', ["install", "-r", runscopeRequirements]);
            yield tl.exec('wget', ["-O", "app.py", runscopeAppPython]);
            let result = tl.TaskResult.Succeeded;
            // execute integration tests
            yield tl.exec('python3', ["app.py", triggerUrl, accessToken]);
            yield tl.setResult(result, null, true);
        }
        catch (err) {
            tl.error(err.message);
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
