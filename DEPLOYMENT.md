# Deployment Instructions

To publish the AdoLina AI Logistics Engine online using Azure Web Apps, follow these steps:

## 1. Azure Setup
1.  Log in to the [Azure Portal](https://portal.azure.com/).
2.  Click on **"Create a resource"** and search for **"Web App"**.
3.  Click **"Create"**.
4.  Configure the following:
    *   **Subscription**: Your Azure subscription.
    *   **Resource Group**: Create a new one or select an existing one.
    *   **Name**: Choose a unique name (e.g., `adolina-logistics-engine`). **Save this name.**
    *   **Publish**: Code.
    *   **Runtime stack**: Node 20 LTS.
    *   **Operating System**: Linux.
    *   **Region**: Choose a region close to you.
5.  Click **"Review + create"** and then **"Create"**.
6.  Once the resource is created, go to the Web App's **Overview** page.
7.  Click on **"Get publish profile"** at the top. This will download a `.PublishSettings` file.

## 2. GitHub Secrets Configuration
1.  Navigate to your repository on GitHub.
2.  Go to **Settings** > **Secrets and variables** > **Actions**.
3.  Click **"New repository secret"**.
4.  **Name**: `AZURE_WEBAPP_PUBLISH_PROFILE`.
5.  **Value**: Paste the entire content of the `.PublishSettings` file you downloaded.
6.  Click **"Add secret"**.

## 3. Workflow Configuration
1.  In your repository, open `.github/workflows/azure-webapps-node.yml`.
2.  Change the value of `AZURE_WEBAPP_NAME` from `'ENTER_YOUR_AZURE_WEB_APP_NAME_HERE'` to the name you chose in step 1.4 (e.g., `adolina-logistics-engine`).

## 4. Trigger Deployment
1.  Commit and push your changes to the `main` branch.
2.  Go to the **Actions** tab in your GitHub repository to monitor the build and deployment process.

Once the workflow finishes successfully, your application will be live at `https://<your-app-name>.azurewebsites.net`.

## 5. Final Pre-Flight Checklist (The "Remaining Steps")
If you have completed the Azure and GitHub setup, ensure these final technical points are addressed:

1.  **Workflow Sync**: Confirm that `.github/workflows/azure-webapps-node.yml` contains your actual Azure Web App name instead of the placeholder `'ENTER_YOUR_AZURE_WEB_APP_NAME_HERE'`.
2.  **Environment Variables**: Go to your Web App in the Azure Portal > **Settings** > **Configuration** > **Application settings** and add any keys defined in `.env.example` (like API keys).
3.  **Port Configuration**: Azure Linux apps usually use port 80 or 443 externally, but Node.js listens on `process.env.PORT`. The engine is already configured to use `process.env.PORT`, so no change is needed here.
4.  **Health Check**: After deployment, visit `https://<your-app-name>.azurewebsites.net/health` to verify the system is responding correctly.
5.  **Dashboard**: Access the main URL `https://<your-app-name>.azurewebsites.net` to see the full-stack dashboard.
6.  **Dependencies**: Ensure that `package-lock.json` is committed to the repository, as the deployment workflow relies on it for caching and consistent builds.
7.  **GitHub Actions Tab**: Check the **Actions** tab in your repository. If you see a green checkmark next to your latest commit, the site is live.
