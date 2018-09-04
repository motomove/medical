package com.ryan.framework.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/core/info")
public class InfoController {

    @RequestMapping("left.do")
    public String left(HttpServletRequest request, org.springframework.ui.Model modelMap) {
//        User user = Context.getCurrentUser();
//        Integer siteId = Context.getCurrentSiteId();
//        List<Node> nodeList = nodeQuery.findList(siteId, null, true, null);
//        nodeList = user.getInfoPermList(siteId, nodeList);
//        modelMap.addAttribute("nodeList", nodeList);
        return "core/info/info_left";
    }

    @RequestMapping("list.do")
    public String list(HttpServletRequest request, org.springframework.ui.Model modelMap) {
//        queryNodeType = queryNodeType == null ? 0 : queryNodeType;
//        Integer siteId = Context.getCurrentSiteId();
//        User user = Context.getCurrentUser();
//        Integer nodeId = null;
//        Integer mainNodeId = null;
//        String treeNumber = null;
//        Node queryNode = null;
//        if (queryNodeId != null) {
//            queryNode = nodeQuery.get(queryNodeId);
//        }
//        if (queryNode != null) {
//            if (queryNodeType == INCLUDE_MULTI) {
//                nodeId = queryNodeId;
//            } else if (queryNodeType == MAIN_NODE) {
//                mainNodeId = queryNodeId;
//            } else {
//                treeNumber = queryNode.getTreeNumber();
//            }
//        }
//        Map<String, String[]> params = Servlets.getParamValuesMap(request, Constants.SEARCH_PREFIX);
//        int infoPermType = user.getInfoPermType(siteId);
//        if (queryInfoPermType != null && queryInfoPermType > infoPermType) {
//            infoPermType = queryInfoPermType;
//        }
//        boolean allInfoPerm = user.getAllInfoPerm(siteId);
//        Page<Info> pagedList = query.findAll(siteId, mainNodeId, nodeId, treeNumber, user.getId(), allInfoPerm,
//                infoPermType, queryStatus, params, pageable);
//        List<Attribute> attributeList = attributeService.findList(siteId);
//        modelMap.addAttribute("pagedList", pagedList);
//        modelMap.addAttribute("attributeList", attributeList);
//        modelMap.addAttribute("queryNodeId", queryNodeId);
//        modelMap.addAttribute("queryNodeType", queryNodeType);
//        modelMap.addAttribute("queryInfoPermType", queryInfoPermType);
//        modelMap.addAttribute("queryStatus", queryStatus);
        return "core/info/info_list";
    }

}
