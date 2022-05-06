import { GraphQLClient } from 'graphql-request';

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const graphcms = new GraphQLClient(
        config.graphCmsUrl,
    );

    return {
        provide: {
            graphcms: () => graphcms
        }
    }
})