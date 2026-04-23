#Quickstart Guide

**EMA In-Lab Protocol — Tilburg University**

> **Who is this guide for?**
> Students with little or no programming experience who need to set up and use
> smartphone-based cognitive tasks. No prior coding knowledge is assumed.
> 
> **Goals of the tutorial:**
> Neuropsychological tasks are usually administered using pen-and-paper tests in a controlled environment. However, cognitive symptoms often fluctuate throughout the day, and in-lab tests may not reflect daily cognitive functioning. To address this issue, we aim to develop and test short cognitive tasks or games that run in a web browser on your smartphone. This allows us to test in more natural environments and administer tasks multiple times a day or week. This tutorial will explain how to program and use those tasks and how to set up an experience sampling (ESM) study.
> 
> **Contents:**
> During this project, you will work with various tasks/games that can be performed on a smartphone or in a web browser. For this, you need several things:
> 
> - A script with the code of the task: The tasks are coded using **JavaScript** or **Python**. **JavaScript** is a coding language used to create web applications that run in the browser. **Python** can also be used for web development and is generally considered an easier language for beginners, but it requires a translator to run in a browser.
> - A code editor: We will use **VS Code**
> - A server to make the experiment available to participants and store the results: For this we will use **Pavlovia**. (Pavlovia.org)
> - An app to send notifications to the participants: For this we will use **M-path**
> 
> **Learning Objectives:** In this tutorial, you will learn the following:
> 
> - Use an existing task to collect single-timepoint data using Pavlovia
> - Use an existing task to collect data in an ESM study using Pavlovia and m-Path
> - Adjust an existing task in JavaScript/Python
> - Create a new task in JavaScript/Python
> - Use Git for version control

---

## Using Pavlovia & Existing Task

---

### Creating an Account

Before you can start using an existing task in Pavlovia, you need to create an account. You can create an account [here](https://gitlab.pavlovia.org/users/sign_up). Be sure to use your **university email**, as this will grant you a free license for Pavlovia. During account creation, they will ask for your **role** and **purpose** for using Pavlovia. We recommend **Data Analyst** and **Using Git**, but feel free to choose what fits best.

### Gitlap vs Pavlovia

Before we get started it is important to know the difference between GitLab and Pavlovia. These are two different websites which shares the same account we just created in the step above.

[Pavlovia](https://pavlovia.org/#main) provides the interface to manage participants, assign credits and launch studies. It mainly acts as a dashboard to have a holistic view for the management of your experiment. Is the "storefront" and the execution server where partiicpants actually interact with the experiment.

[GitLab](https://gitlab.pavlovia.org/) acts as the backend for Pavlovia. Every Pavlovia experiment is a Git repository. In simple words, GitLab acts as "storehouse" of code and data. Each experiment in Pavlovia has a repository (container/place) in GitLap. It is here were we are going to **fork** projects and get the code for editing.

### Pavlovia Tour

On the main page of [Pavlovia](https://pavlovia.org/#main), you will see different tabs. **Docs** is the documentation site where you can find more information about the platform and how to use it. **Explore** contains all experiments that have been uploaded to Pavlovia. These experiments are free to **fork**, which means creating a copy that you can use as your own. In **Dashboard**, you can see your profile and manage your experiments. Finally, in the **Store**, you will find Pavlovia merchandise and services.

### Using Existing Task

In the previous section, we touched on **forking**. By doing a **fork**, we essentially copy the **repository** (a folder with all the experiment contents), which allows us to make changes to the **code** without affecting the original project.

To fork a project, go to Explore and look up an experiment you want to copy. For simplicity, in this tutorial we will look at the Featured Experiments. Here you can find a task named "antisaccade". Hover your mouse over the experiment and click on "view code." It should look like this:

<img src="https://i.ibb.co/pjBX5gjd/Captura-de-pantalla-2026-04-22-161126.png" alt="Captura-de-pantalla-2026-04-22-161126" border="0" width = 200>

This will redirect you to the repository page of the experiment, in other words, it has redirect you to GitLap. In this repository, you will find all the files that make up the experiment. Here, you will want to "fork" the repository. You can do this by clicking on "Forks."

<img src="https://i.ibb.co/PGkvQvc3/Captura-de-pantalla-2026-03-22-103246.png" alt="Captura-de-pantalla-2026-03-22-103246" ></a>

Once clicked, it will redirect you to the "Fork Project" page. Here, you can leave things as they are or change the project name to whatever you want. For this tutorial, I will change the name to "my first data." It is also necessary to select a "Namespace"; in this case, it will be your username. Then click on "Fork Project." You can check that you are on the right place if you have a page similar to this.

<img src="https://i.ibb.co/2YNqddg9/Captura-de-pantalla-2026-04-22-162144.png" alt="Captura-de-pantalla-2026-04-22-162144" width = 400 >

This will lead you to the GitLab project overview page. There is nothing to do here. To get your experiment up and running, go back to the dashboard at Pavlovia.org. You can click [here](https://pavlovia.org/dashboard?tab=1) to be redirected to the dashboard.

You will see that your experiment is "inactive." Before you can collect data, you will want to change its status to "Piloting" or "Running." **Piloting** is for testing. You can run the task for free, but **data is not saved permanently** in the database (it is usually provided as a temporary download at the end of the session). Use this mode to ensure your stimuli and triggers are working correctly. **Running**, on the other hand, is for actual data collection. In this mode, Pavlovia will save every participant's data to the server automatically.

To change the status of your experiment, click on the row where your experiment appears, like this:

<img src="https://i.ibb.co/d4HnfWzC/Captura-de-pantalla-2026-04-22-163331.png" alt="Captura-de-pantalla-2026-04-22-163331" border="0" /></a>

After you click this, a page will appear with the option to change the status of your experiment to "Running." Once you click on "Running," the status will change. There will also be a URL, as highlighted in the image below. You can send this URL to your participants to gather data.

<img src="https://i.ibb.co/MyL52VPV/Captura-de-pantalla-2026-03-22-182421.png" alt="Captura-de-pantalla-2026-03-22-182421" border="0" /></a>

<img src="https://i.ibb.co/MxXgS8K0/Captura-de-pantalla-2026-03-22-105751.png" alt="Captura-de-pantalla-2026-03-22-105751" border="0" /></a>

Once the participant finishes the task, the data is stored in your repository. You can access this data in two ways:

* **Download Button:** On your experiment page, click the **"Download Results"** button to get a ZIP file containing all individual CSV or JSON files.
* **[GitLab](https://gitlab.pavlovia.org/)** Alternatively, you can find the data in the folder within your experiment's GitLab repository (click on the project to view all files in the repository). The folder is named "data."

Since we forked another person's repository, we also copied all previously collected data. Therefore, the "data" folder in your GitLab repository, or in your ZIP file, contains earlier data as well. To find the latest addition to your data folder, check "Last commit" and click on the file to view the data.
<img src="https://i.ibb.co/Xfwz1P27/Captura-de-pantalla-2026-03-22-184826.png" alt="Captura-de-pantalla-2026-03-22-184826" border="0">

**Congratulations** you now know how to use existing tasks in Pavlovia to create your own forked repository, administer tasks via URL, and access the data gathered by your task.

---

# Using the ESM Task

Now that you have an idea on how Pavlovia and GitLab works, its time to use the existing ESM task for data collection.

The process is simple. First request access to the repository with the already existing code. If you have access to the repository from your supervisor account you can send yourself and invite. First go to the overview board, [Projects · GitLab](https://gitlab.pavlovia.org/), click on the project you want to be part of. Once there go to management --> memebers --> Invite members

<img src="https://i.ibb.co/nsNcH9cM/Captura-de-pantalla-2026-04-22-172143.png" alt="Captura-de-pantalla-2026-04-22-172143" border="0" /></a>

Next fill in your username, select the role of reporter and discuss with your supervisor the access time granted for your in this repository, preferably before data collection starts.

<img src="https://i.ibb.co/MFMYND5/Captura-de-pantalla-2026-04-22-172405.png" alt="Captura-de-pantalla-2026-04-22-172405" border="0" /></a>

Once this is done the project will appear on your overview board [Projects · GitLab](https://gitlab.pavlovia.org/), and will be ready to fork.

# Adjusting an Existing Task

Now that you know how to use an existing task, you may want to make some adjustments to it. For example, you may want to change the instructions, add a new stimulus, or modify the timing of the task. To do this, you will need to edit the code of the task. To do so you will need to use a code editor, and for this tutorial, we will use VS Code inside Github Codespace. In the following sections, we will explain how to access Github Codespace and how to use it to edit the code of your task.

## Accessing Github Codespace

Github CodeSpace is a cloud-based, customizable development enviroment (IDE) that allows people to build, code and debug projects in their browser, VS-Code or VS-code in the browser, without the need to download anything. It provides a pre-configured virtual machine that runs in the cloud.

In this tutorial we are going to use Github Codespace which has already been configure as a VS-Code interface with a Jupyter Notebook extension and a Deno kernel which will allows us to code using JavaScript inside Jupyter Notebook.

If this sounds a bit confusing it is because it is. We are essentially have a browser tab which is a virtual machine running in a cloud that has all the tools for ESM task creation and modification.

To access the Github Codespace you will need a Github account, you can create one [here](https://github.com/). Once you have your account you can click on this [repository](https://github.com/rcarrioncanonico/ESM-JavaScript-Tutorial) to go to this tutorials repository. You will have to go to the **Green Box** where it says **Use this template**, click on it, click on **Open in a codespace** and then click on just like in the image below:

<img src="https://i.ibb.co/mV5V3yK9/Captura-de-pantalla-2026-03-27-172751.png" alt="Captura-de-pantalla-2026-03-27-172751" border="0" /></a>

Once you click on "Open in a codespace" it will take a few seconds to load and then you will be able to see the VS-Code interface with all the files of the repository.For starters, we will work with the file named "Jupyter_Starter.ipynb" which is a Jupyter Notebook file that contains the basic of how Jupyter Notebook operates and contains some fundamental information about JavaScript.

It is important to know that changes done in your own codespace will be saved in your own workspace and will not affect the original repository. This means that you can make changes to the code without worrying about breaking anything for other people. Just be sure to not eliminate your codespace, if you do so, all the changes you made will be lost and you will have to create a new codespace and start from scratch.

Alternatively you can fork this repository, similarly to what we did in Pavlovia, and then open the codespace from your own repository, this way you can have a copy of the code in your own repository and you can also make changes to it without worrying about losing it. To do this, you can follow the same steps as before but instead of clicking on "Open in a codespace" you will click on "create new repository" and then follow the same steps as before.

If you are overwhelmed by the VS-Code interface here is an image with the labels of the most important parts of the interface.

<img src="https://i.ibb.co/xcdwnC6/Gemini-Generated-Image-xt469ext469ext46.png" alt="Gemini-Generated-Image-xt469ext469ext46" border="0" /></a>

Alternatively, I recommend you to watch the first 7 minutes of this video which explains the very initial steps of installing and opening VS-Code. These 7 minutes also explains the "Explorer" part of the "Activity Bar" of VS-Code.
[VS Code for Absolute Beginners](https://www.youtube.com/watch?v=lWEKiak0WVU)

Another recommended video is the following, in which the first 12 minutes are enough for you to know the other functions such as extensions and the use of Copilot AI.

[Learn Visual Studio Code in 15 minutes: 2026 Official Beginner Tutorial - YouTube](https://www.youtube.com/watch?v=f8_uF_IDV50)

## The Big Picture: How the Tools Connect

<img src="https://i.ibb.co/sJHJQQXd/Gemini-Generated-Image-1q3pmk1q3pmk1q3p.png" alt="Gemini-Generated-Image-1q3pmk1q3pmk1q3p" border="0" width ="650">

| Tool | What it does |
|------|--------------|
| **Docker Desktop** |Makes it possible to run PsychoPy tasks|
| **VS Code** | Code editor where you read, edit, and run experiment scripts |
| **PsychoPy** | The Python library that actually runs cognitive tasks |
| **Pavlovia** | Hosts the web version of tasks so participants can do them on a phone |
| **m-Path** | Sends scheduled notifications to participants and links them to Pavlovia |

---

## Section 2 — Downloads Checklist

Download and install these applications in order to get your computer ready for programming.

### 2a. What to Download

| # | What | Where to get it | Notes |
|---|------|-----------------|-------|
| 1 | **Git** | [Git - Install](https://git-scm.com/install/) | Necessary to Push code to Pavlovia |

> **Important:** During Git Installation there will be a window that will ask you to choose a default editor, be sure to select Visual Studio Code just like in this image:<img src="https://i.imgur.com/0J9Z70F.jpeg" alt="Git editor selection" width="325"> This is the only modification you have to do during Git installation.

### 2b. Necessary Accounts

| # | What | Where to get it | Notes |
|---|------|-----------------|-------|
| 5 | **Github** | [GitHub](https://github.com/) | Needed to sync with VS-Code and to access AI Copilot for easy coding |
| 6 | **Pavlovia account** | [pavlovia.org](https://pavlovia.org/) | Free for researchers |
| 7 | **m-Path account** | [m-path.io](https://m-path.io/) | Coordinate with your supervisor |

### 2c. Optional additional program:

| # | What | Where to get it | Notes |
|---|------|-----------------|-------|
| 8 | **PsychoPy Standalone** | [psychopy.org/download.html](https://www.psychopy.org/download.html) | In-case you are curious how PsychoPy looks like|

---

## Section 4: GitHub Familiarization

Like anything new, GitHub looks scary and contains a lot of new terminology which we are not use to. Terms like **"Repositories"**, **"Commit"**, **"Pull Requests"** and **"Branch"** are common terms in the GitHub community

You have access to this document through the public *repository* known as `EMA-In-Lab-Protocol` ([Link](https://github.com/rcarrioncanonico/EMA-In-Lab-Protocol)). A *repository* is nothing more than a *big folder* which was uploaded to the cloud in GitHub. It contains different files such as this PDF document, other file types such as jupyter notebook files (.ipynb), python files (.py) and can also contain even more folders inside of it.

As you can see the `EMA-In-Lab-Protocol` has a lot of different files in it. This Quick Guide PDF was just one of those files inside that repository. In order to use this protocol we will want to clone (download) the whole repository into your computer.

There are different ways of saving (cloning) a repository into your computer. The simplest way of doing that is to go to the **"Green Box** that has **"Code** written on it, **click** on it and **click** **Download Zip**

<img src="https://i.imgur.com/LpD6791.png" alt="GitHub download zip" width="325">

Once the Zip file is download. You will find it in your files in "Downloads", hover the cursor on the zip file, *right click* and then click on *extract everything* and confirm extraction.

A new folder with the same name of the zip file will be created, be sure to remember where it is located, which would be in the Downloads folder if you don´t decide to change its location.

<img src="https://i.imgur.com/Lxs2qDJ.png" alt="Extracted folder" width="500">

## Recommended- Obtain Copilot Pro

Coding has never been easier with the help of AI and students and teachers can get Copilot Pro for free for 2 years. Be sure to link your account to the GitHub Education benefits following the instructions of this [Link](https://github.com/settings/education/benefits).

For now that is all you have to do in GitHub, but if you wish to know more about it, I recommend this quick 10 minute video to know more about GitHub.
[How To Use GitHub For Beginners - YouTube](https://www.youtube.com/watch?v=a9u2yZvsqHA&t=325s)
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

## Section 5 — VS Code Familiarization

### 5a. User Interface

Just like GitHUb, VS-Code can be a little bit confusing and overwhelming as soon as you start it up, don´t worry the user-interface is pretty friendly once you get use to it.
Since it is better to visualize someone using VS-Code rather than in text, I recommend you to watch the first 7 minutes of this video which explains the very initial steps of installing and opening VS-Code. These 7 minutes also explains the "Explorer" part of the "Activity Bar" of VS-Code.
Be sure to have VS-Code open along these videos so you can familiarize yourself with the application.

[VS Code for Absolute Beginners](https://www.youtube.com/watch?v=lWEKiak0WVU)

Another recommended video is the following, in which the first 12 minutes are enough for you to know the other functions such as extensions and the use of Copilot AI.

[Learn Visual Studio Code in 15 minutes: 2026 Official Beginner Tutorial - YouTube](https://www.youtube.com/watch?v=f8_uF_IDV50)

### 5b. Installing Necessary Extension and Linking GitHub.

As this tutorial works within the VS-Code enviroment,  we are going to need to install some extensions to run other types of files such as Jupyter Notebook files known to finish in `.ipynb`.

1. 1.) Open VS Code.
2. 2.) Click the **Extensions** icon in the left sidebar (it looks like four squares, or press `Ctrl+Shift+X`).
3. 3.) Search for **Jupyter** (publisher: Microsoft) and click **Install**. <img src="https://i.imgur.com/qaoIv07.png" alt="Jupyter extension" width="325">
4. 4.) Search for **GitHub Copilot Chat** (publisher: GitHub) and click **Install** <img src="https://i.imgur.com/hoa4FRQ.png" alt="GitHub Copilot Chat extension" width="325">
5. 5.) Search for **Python** (publisher: Microsoft) and click **Install** <img src="https://i.imgur.com/72Eykhs.png" alt="Python extension" width="325">

On the "Activity Bar" on the left hand sight of VS-Code you will see an Icon with a cat on it, click on it and sign in with your Github account in order to sync VS-Code with Github and be able to use all of the AI pro tools. If you wish to know more about how GitHub works inside VS-Code you can check out this link: [Working with GitHub in VS Code](https://code.visualstudio.com/docs/sourcecontrol/github)

### 5c. Open the Protocol Folder

1. 1.) In VS Code, go to **File --> Open Folder**.  You can find **"File"** on the top-left corner of VS-Code
2. 2.) Navigate to Downloads Folder
3. 3.) **Select** the folder known as `EMA-In-Lab-Protocol-main` (the one we downloaded and extracted in **Section 4**. <img src="https://i.imgur.com/A9dIqrg.png" alt="Folder selection" width="325">
4. 4.) Once selected, you will see all of the files of the repository  in the "Explorer" icon of the "Activity Bar" which is the "paper looking" icon on the left hand side of VS-Code.
5. 

**Congratulations!** you are free to explore the files of the repository inside VS-Code. From now on this tutorial will take place inside VS-Code. All the files needed to continue were already open during section **5c**. Your next step is to open Jupyter_Starter file inside VS-Code.

​

​
