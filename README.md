# AdoLina-AI-Logistics-Engine
The AdoLina engine is a centralized AI system designed to manage logistics and support operations through four specialized adapters. AdoLina is an AI-powered engine using four adapters (ILSCHERY, ILSFOLLOWS-UP, ILSDEMAND, and ILSOLUTION) to automate and manage Integrated Logistics Support.

## Deployment

The AdoLina AI Logistics Engine is configured for automated deployment to Azure Web Apps. Once changes are merged into the `main` branch, the application will be live at:

**[https://adolina-io.azurewebsites.net](https://adolina-io.azurewebsites.net)**

For detailed setup instructions, please refer to the [DEPLOYMENT.md](DEPLOYMENT.md) file.

## API Endpoints

- `GET /`: Serves the Web Dashboard (HTML) or Engine Status (JSON).
- `GET /health`: System health check.
- `GET /api/tasks`: Fetch logistics tasks from the database.
- `POST /api/tasks`: Create a new logistics task.
