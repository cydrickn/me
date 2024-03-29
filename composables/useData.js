import {gql} from "graphql-request";

export const useData = () => {
    const { $graphcms } = useNuxtApp();
    const config = useRuntimeConfig();

    const getDataLocal = () => {
        return {
            author: {
                bio: 'Your bio in markdown format',
                intro: 'Your intro in markdown format',
                name: 'Cydrick Nonog',
                picture: {
                    url: 'https://api.lorem.space/image/face?hash=75101',
                },
                subTitle: '',
                email: 'hello@cydricknonog.me',
                repository: 'https://github.com/cydrickn/me'
            },
            stacks: [
                {
                    name: 'Nuxt',
                    level: 'Expert',
                    logo: {
                        class: 'text-purple-600',
                        svg: '<svg height="64" viewBox="0 0 64 64.000001" width="64" xmlns="http://www.w3.org/2000/svg"><g stroke-width=".499893" transform="matrix(2.5377204 0 0 2.5377204 -12.870824 -44.131613)"><path d="m12.738188 38.728897a.93694872.93694872 0 0 1 -.04999-.102478 1.3137678 1.3137678 0 0 1 -.08933-.740991h-5.9620691l8.8603961-15.59245 2.908826 5.113401.843468-1.492479-2.535655-4.467041a1.5496671 1.5496671 0 0 0 -1.237634-.817174 1.377804 1.377804 0 0 0 -1.200842.827722l-8.9760217 15.78161a1.587359 1.587359 0 0 0 -.078833 1.48968 1.3812533 1.3812533 0 0 0 1.3138177.633464h7.517685a1.377704 1.377704 0 0 1 -1.313818-.633264z" fill="currentColor"/><path d="m30.022825 37.239017-7.375765-12.993709a1.5535663 1.5535663 0 0 0 -1.242883-.827672 1.3738049 1.3738049 0 0 0 -1.200843.825073l-.953845 1.671191.848718 1.492479 1.313618-2.32545 7.297182 12.804499h-2.774804a1.2425831 1.2425831 0 0 1 -.05779.630615.79952824.79952824 0 0 1 -.05784.128772l-.02364.04729a1.5884088 1.5884088 0 0 1 -1.337462.669856h4.340867a1.5855594 1.5855594 0 0 0 1.337463-.669856 1.378004 1.378004 0 0 0 -.112976-1.453088z" fill="currentColor"/><path d="m25.794933 38.692105.02364-.04729a.79952824.79952824 0 0 0 .05784-.128772 1.2425831 1.2425831 0 0 0 .05779-.630615 1.9201375 1.9201375 0 0 0 -.241748-.646411l-5.588799-9.832638-.853967-1.492479-.848717 1.492479-5.5864 9.832888a1.9908223 1.9908223 0 0 0 -.215454.646411 1.3139177 1.3139177 0 0 0 .08148.740991.92760073.92760073 0 0 0 .04999.102478 1.3813532 1.3813532 0 0 0 1.313868.633264h10.405164a1.592108 1.592108 0 0 0 1.345311-.670306zm-6.545444-9.793246 5.108153 8.986569h-10.213656z" fill="currentColor"/></g></svg>',
                    },
                    stackCategories: [
                        { name: 'Backend', shortName: '' },
                        { name: 'Frontend', shortName: '' },
                    ]
                }
            ],
            experiences: [
                {
                    company: 'Company 1',
                    website: 'https://company.example',
                    companyTag: 'company',
                    description: 'what you have done in this company in markdown format',
                    role: 'Software Engineer',
                    startDate: '2022-01-01',
                    endDate: '2022-02-01',
                    jobStatus: 'FullTime',
                }
            ],
            socials: [
                {
                    name: 'Github',
                    icon: 'icons-github',
                    url: 'https://github.com/cydrickn',
                    iconAsSvg: false,
                }
            ],
            projects: [{
                name: 'Personal Website V2',
                description: 'The second version of my personal website',
                link: 'https://cydricknonog.me',
                sourceCode: 'https://github.com/cydrickn/me'
            }]
        }
    }

    const getPost = async (slug) => {
        return await $graphcms().request(
            gql`{
                post(where: {slug: "${slug}"}, stage: PUBLISHED) {
                    author {
                        name
                        picture {
                            fileName
                            url
                        }
                    }
                    content {
                        html
                    }
                    title
                    tags
                    slug
                    coverImage {
                        fileName
                        url
                        width
                        height
                    }
                    date
                    excerpt
                }
            }`
        );
    }


    const getDataGraphCms = () => {
        return $graphcms().request(
            gql`{
                author(where: {id: "${config.authorId}"}, stage: PUBLISHED) {
                    bio
                    intro
                    name
                    picture {
                        url
                    }
                    subTitle
                    email
                    repository
                }
                stacks(where: {visible: true}, stage: PUBLISHED) {
                    name
                    level
                    logo {
                        class
                        svg
                    }
                    stackCategories {
                        name
                        shortName
                    }
                }
                experiences(stage: PUBLISHED, orderBy: endDate_DESC) {
                    company
                    website
                    companyTag
                    description
                    role
                    startDate
                    endDate
                    jobStatus
                }
                socials(stage: PUBLISHED) {
                    name
                    icon
                    url
                    iconAsSvg
                }
                projects(stage: PUBLISHED) {
                    name
                    description
                    link
                    sourceCode
                }
                posts(stage: PUBLISHED) {
                    title
                    slug
                    tags
                    date
                    excerpt
                    coverImage {
                        fileName
                        url
                        width
                        height
                    }
                    author {
                        name
                        picture {
                            fileName
                            url
                        }
                    }

                }
            }`
        )
    }

    const getData = async () => {
        if (config.useGraphCms) {
            return getDataGraphCms();
        }

        return getDataLocal();
    }

    return {
        getData,
        getPost
    }
}
