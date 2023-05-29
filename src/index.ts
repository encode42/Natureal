import type { Command } from "~/type/Command";
import { initPath } from "~/util/path";
import { createCommand, createOption, program } from "commander";
import { exportCommand } from "~/command/export";
import { checkCommand } from "~/command/check";

import { $ } from "zx";
$.verbose = false;

const commands: Command[] = [
    exportCommand,
    checkCommand
];

async function index() {
    await initPath();

    for (const command of commands) {
        const theCommand = createCommand()
            .command(command.name)
            .action(command.action);

        if (command.description) {
            theCommand.description(command.description);
        }

        if (command.arguments) {
            theCommand.arguments(command.arguments);
        }

        if (command.options) {
            for (const option of command.options) {
                const theOption = createOption(`${option.name}${option.arguments ? ` ${option.arguments}` : undefined}`, option.description);

                theOption.default(option.default);
                theCommand.addOption(theOption);
            }
        }

        program.addCommand(theCommand);
    }

    program.parse();
}

index();
