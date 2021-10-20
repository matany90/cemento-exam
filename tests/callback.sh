#!/bin/bash

# test callback endpoint using curl
curl \
-X POST \
http://localhost:5000/api/v1/events/callback \
-d '{
    "definitions": {
        "eventConfigurations": {
            "safetySummeryReport": {
                "type": "generateForm",
                "id": "safetySummeryReport",
                "schedule": {
                    "day": "0",
                    "hour": "07",
                    "minute": "00"
                }
            }
        },
        "projects": {
            "-projectA_Midtown_5th": {
                "safetySummeryReport": {
                    "formTemplatesIds": {
                        "-safetySummeryReport": {
                            "targetEmails": {
                                "BillyCranston@constructionGroup!2Ecom": "BillyCranston@constructionGroup_com",
                                "KimberlyHart@constructionGroup!2Ecom": "KimberlyHart@constructionGroup_com",
                                "ZackTaylor@constructionGroup!2Ecom": "ZackTaylor@constructionGroup_com"
                            }
                        }
                    }
                }
            },
            "-projectB_Uptown_Bowery_40th": {
                "safetySummeryReport": {
                    "formTemplatesIds": {
                        "-safetySummeryReport": {
                            "targetEmails": {
                                "BillyCranston@constructionGroup!2Ecom": "BillyCranston@constructionGroup_com",
                                "ZackTaylor@constructionGroup!2Ecom": "ZackTaylor@constructionGroup_com",
                                "JasonLeeScott@constructionGroup!2Ecom": "JasonLeeScott@constructionGroup_com"
                            }
                        }
                    }
                }
            },
            "-project_Uptown_Bowery_42th": {
                "safetySummeryReport": {
                    "formTemplatesIds": {
                        "-safetySummeryReport": {
                            "targetEmails": {
                                "TriniKwan@constructionGroup!2Ecom": "TriniKwan@constructionGroup_com",
                                "ZackTaylor@constructionGroup!2Ecom": "ZackTaylor@constructionGroup_com",
                                "JasonLeeScott@constructionGroup!2Ecom": "JasonLeeScott@constructionGroup_com"
                            }
                        }
                    }
                }
            },
            "-projectD_Uptown_Bowery_44th": {
                "safetySummeryReport": {
                    "formTemplatesIds": {
                        "-safetySummeryReport": {
                            "targetEmails": {
                                "Zordon@constructionGroup!2Ecom": "Zordon@constructionGroup_com",
                                "TommyOliver@constructionGroup!2Ecom": "TommyOliver@constructionGroup_com"
                            }
                        }
                    }
                }
            }
        }
    }
}' \
-H "Content-type: application/json"