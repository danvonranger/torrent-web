
class Controller {
    constructor() {
        this.serviceSeries = {};
    }

    async seriesCount() {
        this.serviceSeries = await this.retrieveSeriesAsync();
        return this.serviceSeries.length;
    }

    async retrieveSeriesAsync() {
        const res = await fetch('/api/series/');
        return await res.json();
    }

    async retrieveSeasonData(id) {
        const res = await fetch(`/api/seasons/${id}`);
        return await res.json();
    }

    async triggerUpdate(index) {
        const series = this.nextSeries(index);
        const seasonData = await this.retrieveSeasonData(series.id);
        await this.delay();
        for (let season of seasonData) {
            if (season.episode === "*") continue;
            yield this.setCurrentProgress(series, season);
            await this.delay();
        }
    }

    async delay(){
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setCurrentProgress(series, season) {
        const progressMessage = `Updating ${series.name} Season: ${season.season} Episode: ${season.episode}`;
        return { action: progressMessage };
    }

    nextSeries(index) {
        return this.serviceSeries[index];
    }

}
export default new Controller();