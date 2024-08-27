import { ProcessInterface, NetScannerInitType, ChatType } from "./type";
import NetworkScannerIcon from "../assets/Icons/NetworkScanner.svg";
import PortScannerIcon from "../assets/Icons/PortScanner.svg";
import WebBrowserIcon from "../assets/Icons/WebBrowser.svg";
import { animations } from "../assets/animations/animations";

export enum CheckPointKey {
  Netscanner,
  NetscannerIP,
  NetscannerScanButton,
  TerminalNmap,
  PortScanner,
  PortScannerIP,
  PortScannerButton,
  PortScannerNmap,
  PasswordManager,
  PasswordManagerUrl,
  PasswordManagerButton,
  PasswordSshCommand,
  TomPassword,
  PasswordVictimCommand,
  CurrentDirPwd,
  CdHomeTom,
  HomePwd,
  CdHome,
  BasePwd,
  CdRoot,
  RootPwd,
  CatCommand,
}

export const desktopProcess: ProcessInterface[] = [
  {
    screen: "NET-SCANNER",
    title: "Network scanner",
    icon: NetworkScannerIcon,
    checkPoint: CheckPointKey.Netscanner,
  },
  {
    screen: "PORT-SCANNER",
    title: "Port Scanner",
    icon: PortScannerIcon,
    checkPoint: CheckPointKey.PortScanner,
  },
  {
    screen: "PASSWORD-MANAGER",
    title: "Web Browser",
    icon: WebBrowserIcon,
    checkPoint: CheckPointKey.PasswordManager,
  },
];

export const netscannerInputs = {
  startIp: "10.10.10.2",
  endIp: "10.10.10.20",
};
export const portScannerInputs = "10.10.10.15";
export const netScannerInit: NetScannerInitType = {
  disable: false,
  error: null,
  output: null,
};

export const portScannerInit: NetScannerInitType = {
  disable: false,
  error: null,
  output: null,
};

export const welcomeText = <></>;
export const defaultCMD = (
  <span className="text-white">user@attackbox$ ~{">"}</span>
);

export const secretFileData =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur cumque harum quo minima, expedita similique ipsam quibusdam error, quidem unde incidunt in. Provident, laudantium tenetur nemo velit modi quisquam mollitia";

export const phase3 = {
  portScanner: {
    cmd: "nmap -sS 10.10.10.15",
    output: [
      "Nmap scan report for 10.10.10.15",
      "Host is up for (0.00027s latency).",
      "Not shown: 997 closed tcp ports",
      "PORT  STATE  SERVICE",
      "21/tcp  open  vsftpd",
      "22/tcp  open  openSSH",
      "80/tcp  open  Apache Web Server",
    ],
  },
  netScanner: {
    cmd: "nmap -sP 10.10.10.2-20",
    output: [
      "Nmap scan report for 10.10.10.15",
      "Host is up for (0.27s latency).",
    ],
  },
  passwordManager: {
    cmd: "pinbrute https://10.10.10.15/000 999",
    output: ["Bruteforcing PIN code...", "PIN code found! (456)"],
  },
  help: {
    cmd: "pinbrute --help",
    output: ["Usage: pinbrute <URL> <start_PIN> <end_PIN>"],
  },
};
export const PhaseLists = ({
  lists,
  flag,
}: {
  lists: string[];
  flag?: string;
}) => {
  return (
    <div className="text-blue flex flex-col gap-0">
      {lists.map((list) => (
        <span key={list}>{list}</span>
      ))}
      {flag && <p>{flag}</p>}
    </div>
  );
};
export const DirectoryLists = ({ lists }: { lists: string[] }) => {
  return (
    <div className="text-blue flex gap-4">
      {lists.map((list) => (
        <span key={list}>{list}</span>
      ))}
    </div>
  );
};
export enum checkPointState {
  NOT_ALLOWED,
  ALLOWED,
  OPENED,
  ALL,
}

// Chat Messages
export const script: ChatType[] = [
  {
    message: `Hey there, welcome to your first day at THM Inc. Ready for your first assignment?`,
    bot: true,
  },
  {
    message: `Huh? But I just got here. Shouldn't I get trained before?`,
    bot: false,
  },
  { message: `Don't worry. I'll assist you all the way into it!`, bot: true },
  {
    message: `For your first assignment we'll use a simulated lab to hack into our first machine. This way, you don't have to worry about damaging your target in any way! In fact, explore as much as you can. The labs are made to be easily reset to their initial state in minutes, should anything go wrong.`,
    bot: true,
  },
  { message: `Does this apply to all the training at THM Inc.?`, bot: false },
  {
    message: `Yes! Don't worry about breaking anything. You have our full permission to do it.`,
    bot: true,
  },
  {
    message: `Getting back to your task, we will hack into a simple machine by using one of the oldest tricks in the book. But before attacking the machine, we need to find it.`,
    bot: true,
  },
  { message: `Find it?`, bot: false },
  {
    message: `Yes! Each machine connected to a network will have an IP address. Simply put, to interact with a machine, you need its IP address.`,
    bot: true,
  },
  {
    message: `Think of it like a telephone number, but to contact a machine in a network.`,
    bot: true,
  },
  { message: `Hmmm... So it's just a number?`, bot: false },
  {
    message: `In a sense it is, but you will normally see an IP address as a sequence of four numbers between 0 and 255 separated by dots.`,
    bot: true,
  },
  {
    message: `If you check the Network Map, you can see your machine has the IP 10.10.10.1, for example.`,
    bot: true,
  },
  {
    message: `So, how do I find the IP address of the target machine?`,
    bot: false,
  },
  {
    message: `Usually, machines are grouped in networks. Machines in the same network are assigned IP addresses from a contiguous block of IPs.`,
    bot: true,
  },
  {
    message: `The target machine is in the same network as us. To find the target machine, we will have to probe a range of IP addresses close to ours and see which of them respond to the probe.`,
    bot: true,
  },
  { message: `What do you mean by probe?`, bot: false },
  {
    message: `We will use a tool that sends a packet to each IP address in a range, and reports which IP addresses replied to the packet.`,
    bot: true,
    checkPoint: CheckPointKey.Netscanner,
  },
  {
    message: `Click on the Network Scanner tool in your desktop.`,
    bot: true,
    checkPoint: CheckPointKey.NetscannerIP,
  },
  {
    message: `Now set the IP range between 10.10.10.2 and 10.10.10.20`,
    bot: true,
    checkPoint: CheckPointKey.NetscannerScanButton,
  },
  {
    message: `Now hit the scan button and the tool will work its magic!`,
    bot: true,
  },
  { message: "You've found the target. Great job!", bot: true },
  {
    message:
      "By the way, you can also achieve the same result by using a tool from the terminal.",
    bot: true,
  },
  { message: "What's a terminal?", bot: false },
  {
    message:
      "It's that black window at the bottom of the screen. It allows you to run commands that don't have a Graphical Interface to them.",
    bot: true,
  },

  {
    message: "So how would I scan the network from there?",
    bot: false,
    checkPoint: CheckPointKey.TerminalNmap,
  },
  {
    message: `Type "nmap -sP 10.10.10.2-20" in the terminal window now.`,
    bot: true,
  },
  {
    message: `As you see, the same results are obtained, but tools in the terminal output text only.`,
    bot: true,
  },
  {
    message: `Why would I use them instead of the graphical tools, then?`,
    bot: false,
  },
  {
    message: `It's a matter of choice, really. I prefer the terminal because it saves me time when running simple tasks. But you are free to develop your own style!`,
    bot: true,
  },
  {
    message: `Let's continue with the lab.`,
    bot: true,
  },
  {
    message:
      "Now that we know the IP address of the machine, we will enumerate any network applications it may be running.",
    bot: true,
  },
  { message: "Applications?", bot: false },
  {
    message:
      "Machines may run a bunch of programs that make use of the network. ",
    bot: true,
  },
  {
    message:
      "You may run a browser, your email client and a chat application at the same time and they all make use of the network.",
    bot: true,
  },
  {
    message:
      "I see... So when receiving a packet, how does the computer know to which application is it supposed to go?",
    bot: false,
  },
  {
    message: 'Each application makes use of a specific "port" for that. ',
    bot: true,
  },
  { message: "A port???", bot: false },
  {
    message:
      "A port is just a number in the range of 1 to 65535 that an app uses to identify itself.",
    bot: true,
  },
  {
    message:
      "When sending a packet, you include the number of the port you want to contact so that the receiving server knows which app you want to talk to.",
    bot: true,
  },
  {
    message:
      "That sounds easy enough! So how will I know what applications are running in a machine?",
    bot: false,
  },
  {
    message:
      "You just probe a range of ports and see which ones respond! Just as we did to discover live IP addresses before.",
    bot: true,
  },
  {
    message: "And let me guess, we have a tool for that.",
    bot: false,
    checkPoint: CheckPointKey.PortScanner,
  },
  {
    message: "Yes we do! Please click on the Portscanner tool to continue.",
    bot: true,
    checkPoint: CheckPointKey.PortScannerIP,
  },
  {
    message: `The tool will scan the most commonly used ports, so we don't need to specify a range of ports. Just go ahead and input the target machine's IP address.`,
    bot: true,
    checkPoint: CheckPointKey.PortScannerButton,
  },
  { message: `Finally, hit the scan button.`, bot: true },
  {
    message: `Well done!`,
    bot: true,
  },
  {
    message: `Just as before, you can use a command in the terminal to achieve the same results.`,
    bot: true,
    checkPoint: CheckPointKey.PortScannerNmap,
  },
  {
    message: `Type "nmap -sS 10.10.10.15" to scan the ports of the target IP.`,
    bot: true,
  },
  {
    message: `Once again, you get the same results in a text-based format.`,
    bot: true,
  },
  { message: `I'm starting to like this terminal!`, bot: false },
  {
    message: `That's great! Knowing your way around it will pay off in the long term. Let's continue with the lab.`,
    bot: true,
  },
  {
    message: `We've found 3 different ports. Let's focus in port 80 for now. Port 80 is normally used by web servers so it's a nice first target.`,
    bot: true,
  },
  { message: `What's a web server?`, bot: false },
  {
    message: `It's an application that serves web pages. As simple as that!`,
    bot: true,
  },
  {
    message: `When you open your browser and point it to <a target="_blank" class="underline" href="http://www.tryhackme.com">http://www.tryhackme.com</a>, your browser will connect to THM's web server on port 80 to retrieve the website information.`,
    bot: true,
  },
  { message: `Port 80? Is this a coincidence?`, bot: false },
  {
    message: `Some port numbers are assigned to certain applications. Port 80 is normally used by web servers.`,
    bot: true,
    checkPoint: CheckPointKey.PasswordManager,
  },
  {
    message: `In fact, lets open the web browser to check what web site is being served by our target machine.`,
    bot: true,
    checkPoint: CheckPointKey.PasswordManagerUrl,
  },
  { message: `Now input http://10.10.10.15 in the address bar`, bot: true },
  {
    message: `Interesting, this looks like a password vault. But it's protected with a code.`,
    bot: false,
  },
  {
    message: `What if we try all possible combinations as we did when scanning for IPs and ports?`,
    bot: false,
  },
  {
    message: `Ah, now you're getting the hang of it! I have the perfect tool for you. Your browser comes pre-installed with a plugin that can be used to brute force passwords.`,
    bot: true,
    checkPoint: CheckPointKey.PasswordManagerButton,
  },
  {
    message: `Click in the Brute-force Plugin button in your browser's toolbar.`,
    bot: true,
  },
  {
    message: `The plugin is trying every single possible combination of numbers for the PIN. This shouldn't take too long considering the PIN is only 3-digits.`,
    bot: true,
  },
  {
    message: `We got access! And it's showing the contents of the vault. We got some credentials, but what is SSH?`,
    bot: false,
  },
  {
    message: `Remember the results from the portscan? SSH is the application running in port 22. It allows users to connect remotely to the console of a computer.`,
    bot: true,
  },
  {
    message: `Just as you use a browser to connect to web servers, you can use an SSH client to connect to SSH in a computer with port 22 open.`,
    bot: true,
  },
  { message: `But I don't see any SSH client in the desktop...`, bot: false },
  {
    message: `That's because we don't have a desktop version of an SSH client in the machine. We do have a terminal version that we can use, however.`,
    bot: true,
  },
  {
    message: `You can use the "ssh" command in the terminal to connect to the victim computer. You'll need to indicate the IP address to which you want to connect, and the username in the command.`,
    bot: true,
    checkPoint: CheckPointKey.PasswordSshCommand,
  },
  {
    message: `The format of the command is "ssh &lt;username&gt;@&lt;ip-address&gt;". You have all you need, so just replace the username and IP address to connect.`,
    bot: true,
    checkPoint: CheckPointKey.TomPassword,
  },
  {
    message: "Now input the password for user tom.",
    bot: true,
  },
  {
    message: `Notice how the console now shows you are connected to the victim PC instead of your PC.`,
    bot: true,
  },
  {
    message: "Nice! Does this mean I can send commands to the victim PC?",
    bot: false,
  },
  {
    message:
      "Yes! Every command you run from now on will be executed by the victim PC.",
    bot: true,
  },
  {
    message:
      "But I don't know many commands. I've never used a terminal before.",
    bot: false,
  },
  {
    message:
      "Don't worry too much about it. You've already hacked into the machine. All that is left to do is retrieve a file from the victim machine.",
    bot: true,
  },
  {
    message:
      "The file we need is at /root/flag.txt. You will use some basic commands for this.",
    bot: true,
  },
  {
    message: "Which commands?",
    bot: false,
  },
  {
    message:
      "Type help in the console to get a list of the available commands and their description.",
    bot: true,
    checkPoint: CheckPointKey.CurrentDirPwd,
  },
  {
    message: "First, use the pwd command to print the current directory.",
    bot: true,
    checkPoint: CheckPointKey.CdHomeTom,
  },
  {
    message: `Nice! We are currently at the /home/tom/ directory. To reach /root/flag.txt we need to go back in the directory structure. To do so, you can use "cd .."`,
    bot: true,
    checkPoint: CheckPointKey.HomePwd,
  },
  {
    message: "Now type pwd again to see the new current directory.",
    bot: true,
    checkPoint: CheckPointKey.CdHome,
  },
  {
    message:
      "Notice you went up a directory and are now at /home/. Let's repeat the command to get up the directory structure again.",
    bot: true,
    checkPoint: CheckPointKey.BasePwd,
  },
  {
    message: "Type pwd again.",
    bot: true,
  },
  {
    message:
      "You are now at /. This is the root directory of any Linux installation. This is equivalent to C:\\ in Windows and represents the base directory of the operating system.",
    bot: true,
    checkPoint: CheckPointKey.CdRoot,
  },
  {
    message: `From here, we can go into the root directory by typing "cd root"`,
    bot: true,
    checkPoint: CheckPointKey.RootPwd,
  },
  {
    message: "Verify you are in /root by using pwd.",
    bot: true,
    checkPoint: CheckPointKey.CatCommand,
  },
  {
    message: `Finally, to get the contents of the flag.txt file, use the cat command followed by the name of the file you want to read. That would be "cat flag.txt"`,
    bot: true,
  },
  {
    message: "You got it! Not bad for your first assignment. Congrats!",
    bot: true,
  },
];

// Chat Messages End

export const terminalCmds = {
  ssh: {
    command: "ssh tom@10.10.10.15",
  },
  sshPassword: {
    command: "thm2023",
    isPassword: true,
  },
  help: {
    command: "help",
  },
  listFiles: {
    command: "ls",
  },
  exploreDirectory: {
    command: "cd",
  },
  currentDirectory: {
    command: "pwd",
  },
  parentDirectory: {
    command: "pwd",
  },
  openFile: {
    command: "cat flag.txt",
  },
  backDirectory: {
    command: "cd ..",
  },
};

export const allAnimations = [
  {
    label: "network-scanner",
    animation: animations.networkScanner,
  },
  {
    label: "port-scanner",
    animation: animations.portScanner,
  },
  {
    label: "password-manager",
    animation: animations.passwordManager,
  },
  {
    label: "ssh-animation",
    animation: animations.SshAnimation,
  },
];
