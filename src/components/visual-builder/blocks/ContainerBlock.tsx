import React from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2 } from 'lucide-react';

interface ContainerBlockProps {
  // Layout
  columns?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  
  // Background
  background?: string;
  backgroundImage?: string;
  
  // Border
  borderWidth?: number;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double' | 'none';
  borderColor?: string;
  borderRadius?: number;
  
  // Shadow
  boxShadow?: string;
  
  // Hover Effects
  hoverBackground?: string;
  hoverBorderColor?: string;
  hoverTransform?: string;
  
  // Animation
  animation?: 'none' | 'fadeIn' | 'slideIn' | 'zoom' | 'bounce';
  animationDuration?: number;
  animationDelay?: number;
  
  // Alignment
  displayType?: 'block' | 'flex' | 'grid';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  flexDirection?: 'row' | 'column';
  gap?: number;
  
  children?: React.ReactNode;
}

export const ContainerBlock: React.FC<ContainerBlockProps> = ({
  // Layout
  columns = 1,
  paddingTop = 16,
  paddingBottom = 16,
  paddingLeft = 16,
  paddingRight = 16,
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  
  // Background
  background = "#ffffff",
  backgroundImage,
  
  // Border
  borderWidth = 0,
  borderStyle = 'solid',
  borderColor = "#000000",
  borderRadius = 0,
  
  // Shadow
  boxShadow,
  
  // Hover Effects
  hoverBackground,
  hoverBorderColor,
  hoverTransform,
  
  // Animation
  animation = 'none',
  animationDuration = 300,
  animationDelay = 0,
  
  // Alignment
  displayType = 'block',
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  flexDirection = 'row',
  gap = 0,
  
  children
}) => {
  const { 
    connectors: { connect, drag }, 
    selected,
    hovered
  } = useNode((state) => ({
    selected: state.events.selected,
    hovered: state.events.hovered
  }));

  // Build dynamic styles
  const containerStyle: React.CSSProperties = {
    // Padding
    paddingTop: `${paddingTop}px`,
    paddingBottom: `${paddingBottom}px`,
    paddingLeft: `${paddingLeft}px`,
    paddingRight: `${paddingRight}px`,
    
    // Margin
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    marginLeft: `${marginLeft}px`,
    marginRight: `${marginRight}px`,
    
    // Background
    backgroundColor: background,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    
    // Border
    borderWidth: `${borderWidth}px`,
    borderStyle: borderStyle,
    borderColor: borderColor,
    borderRadius: `${borderRadius}px`,
    
    // Shadow
    boxShadow: boxShadow,
    
    // Display & Layout
    display: displayType,
    justifyContent: displayType === 'flex' ? justifyContent : undefined,
    alignItems: displayType === 'flex' ? alignItems : undefined,
    flexDirection: displayType === 'flex' ? flexDirection : undefined,
    gap: displayType === 'flex' || displayType === 'grid' ? `${gap}px` : undefined,
    gridTemplateColumns: displayType === 'grid' ? `repeat(${columns}, 1fr)` : undefined,
    
    // Animation
    animationName: animation !== 'none' ? animation : undefined,
    animationDuration: `${animationDuration}ms`,
    animationDelay: `${animationDelay}ms`,
    animationFillMode: 'both',
    
    // Transition for hover effects
    transition: 'all 0.3s ease',
  };

  // Hover styles
  const hoverStyles: React.CSSProperties = {
    backgroundColor: hoverBackground || background,
    borderColor: hoverBorderColor || borderColor,
    transform: hoverTransform || 'none',
  };

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      className={`min-h-[100px] w-full transition-all duration-200 relative group ${
        selected 
          ? 'ring-2 ring-blue-500 ring-offset-2' 
          : hovered 
          ? 'ring-1 ring-blue-300' 
          : ''
      }`}
      style={containerStyle}
      onMouseEnter={(e) => {
        if (hoverBackground || hoverBorderColor || hoverTransform) {
          Object.assign(e.currentTarget.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        if (hoverBackground || hoverBorderColor || hoverTransform) {
          Object.assign(e.currentTarget.style, containerStyle);
        }
      }}
    >
      {React.Children.count(children) > 0 ? (
        children
      ) : (
        <div className="text-gray-400 text-center py-8 pointer-events-none select-none border-2 border-dashed border-gray-300 rounded">
          Drop components here
        </div>
      )}
      
      {selected && (
        <div className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10">
          Container
        </div>
      )}
    </div>
  );
};

export const ContainerBlockSettings = () => {
  const { actions: { setProp }, props, id, parent } = useNode((node) => ({
    props: node.data.props,
    id: node.id,
    parent: node.data.parent
  }));
  
  const { actions, query } = useEditor();

  const handleDelete = () => {
    // Prevent deleting the root node
    if (!parent || parent === 'ROOT') {
      console.log('Cannot delete root container');
      return;
    }
    actions.delete(id);
  };

  // Check if this is the root container
  const isRootContainer = !parent || parent === 'ROOT';

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {/* Delete Button - only show for non-root containers */}
      {!isRootContainer && (
        <>
          <Button 
            onClick={handleDelete} 
            variant="destructive" 
            size="sm" 
            className="w-full"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Container
          </Button>
          
          <Separator />
        </>
      )}
      
      <Tabs defaultValue="layout" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="border">Border</TabsTrigger>
          <TabsTrigger value="effects">Effects</TabsTrigger>
        </TabsList>
        
        <TabsContent value="layout" className="space-y-4">
          {/* Columns */}
          <div>
            <Label htmlFor="columns">Columns</Label>
            <Select
              value={props.columns?.toString() || "1"}
              onValueChange={(value) => setProp((props: ContainerBlockProps) => props.columns = parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Column</SelectItem>
                <SelectItem value="2">2 Columns</SelectItem>
                <SelectItem value="3">3 Columns</SelectItem>
                <SelectItem value="4">4 Columns</SelectItem>
                <SelectItem value="6">6 Columns</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Display Type */}
          <div>
            <Label htmlFor="displayType">Display Type</Label>
            <Select
              value={props.displayType || "block"}
              onValueChange={(value) => setProp((props: ContainerBlockProps) => props.displayType = value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="block">Block</SelectItem>
                <SelectItem value="flex">Flex</SelectItem>
                <SelectItem value="grid">Grid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Flex/Grid specific options */}
          {(props.displayType === 'flex' || props.displayType === 'grid') && (
            <>
              <div>
                <Label htmlFor="gap">Gap (px)</Label>
                <Input
                  id="gap"
                  type="number"
                  value={props.gap || 0}
                  onChange={(e) => setProp((props: ContainerBlockProps) => props.gap = parseInt(e.target.value))}
                />
              </div>
              
              {props.displayType === 'flex' && (
                <>
                  <div>
                    <Label htmlFor="flexDirection">Direction</Label>
                    <Select
                      value={props.flexDirection || "row"}
                      onValueChange={(value) => setProp((props: ContainerBlockProps) => props.flexDirection = value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="row">Row</SelectItem>
                        <SelectItem value="column">Column</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="justifyContent">Justify Content</Label>
                    <Select
                      value={props.justifyContent || "flex-start"}
                      onValueChange={(value) => setProp((props: ContainerBlockProps) => props.justifyContent = value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flex-start">Start</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="flex-end">End</SelectItem>
                        <SelectItem value="space-between">Space Between</SelectItem>
                        <SelectItem value="space-around">Space Around</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="alignItems">Align Items</Label>
                    <Select
                      value={props.alignItems || "flex-start"}
                      onValueChange={(value) => setProp((props: ContainerBlockProps) => props.alignItems = value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flex-start">Start</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="flex-end">End</SelectItem>
                        <SelectItem value="stretch">Stretch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </>
          )}

          {/* Padding Controls */}
          <div className="space-y-2">
            <Label>Padding</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="paddingTop" className="text-xs">Top</Label>
                <Input
                  id="paddingTop"
                  type="number"
                  value={props.paddingTop || 16}
                  onChange={(e) => setProp((props: ContainerBlockProps) => props.paddingTop = parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="paddingBottom" className="text-xs">Bottom</Label>
                <Input
                  id="paddingBottom"
                  type="number"
                  value={props.paddingBottom || 16}
                  onChange={(e) => setProp((props: ContainerBlockProps) => props.paddingBottom = parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="paddingLeft" className="text-xs">Left</Label>
                <Input
                  id="paddingLeft"
                  type="number"
                  value={props.paddingLeft || 16}
                  onChange={(e) => setProp((props: ContainerBlockProps) => props.paddingLeft = parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="paddingRight" className="text-xs">Right</Label>
                <Input
                  id="paddingRight"
                  type="number"
                  value={props.paddingRight || 16}
                  onChange={(e) => setProp((props: ContainerBlockProps) => props.paddingRight = parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Margin Controls */}
          <div className="space-y-2">
            <Label>Margin</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="marginTop" className="text-xs">Top</Label>
                <Input
                  id="marginTop"
                  type="number"
                  value={props.marginTop || 0}
                  onChange={(e) => setProp((props: ContainerBlockProps) => props.marginTop = parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="marginBottom" className="text-xs">Bottom</Label>
                <Input
                  id="marginBottom"
                  type="number"
                  value={props.marginBottom || 0}
                  onChange={(e) => setProp((props: ContainerBlockProps) => props.marginBottom = parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="marginLeft" className="text-xs">Left</Label>
                <Input
                  id="marginLeft"
                  type="number"
                  value={props.marginLeft || 0}
                  onChange={(e) => setProp((props: ContainerBlockProps) => props.marginLeft = parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="marginRight" className="text-xs">Right</Label>
                <Input
                  id="marginRight"
                  type="number"
                  value={props.marginRight || 0}
                  onChange={(e) => setProp((props: ContainerBlockProps) => props.marginRight = parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="style" className="space-y-4">
          {/* Background Color */}
          <div>
            <Label htmlFor="background">Background Color</Label>
            <Input
              id="background"
              type="color"
              value={props.background || "#ffffff"}
              onChange={(e) => setProp((props: ContainerBlockProps) => props.background = e.target.value)}
            />
          </div>
          
          {/* Background Image */}
          <div>
            <Label htmlFor="backgroundImage">Background Image URL</Label>
            <Input
              id="backgroundImage"
              type="url"
              value={props.backgroundImage || ""}
              onChange={(e) => setProp((props: ContainerBlockProps) => props.backgroundImage = e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          {/* Box Shadow */}
          <div>
            <Label htmlFor="boxShadow">Box Shadow</Label>
            <Select
              value={props.boxShadow || "none"}
              onValueChange={(value) => setProp((props: ContainerBlockProps) => props.boxShadow = value === "none" ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="0 1px 3px rgba(0,0,0,0.1)">Small</SelectItem>
                <SelectItem value="0 4px 6px rgba(0,0,0,0.1)">Medium</SelectItem>
                <SelectItem value="0 10px 15px rgba(0,0,0,0.1)">Large</SelectItem>
                <SelectItem value="0 20px 25px rgba(0,0,0,0.1)">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
        
        <TabsContent value="border" className="space-y-4">
          {/* Border Width */}
          <div>
            <Label htmlFor="borderWidth">Border Width (px)</Label>
            <Input
              id="borderWidth"
              type="number"
              value={props.borderWidth || 0}
              onChange={(e) => setProp((props: ContainerBlockProps) => props.borderWidth = parseInt(e.target.value))}
            />
          </div>
          
          {/* Border Style */}
          <div>
            <Label htmlFor="borderStyle">Border Style</Label>
            <Select
              value={props.borderStyle || "solid"}
              onValueChange={(value) => setProp((props: ContainerBlockProps) => props.borderStyle = value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="solid">Solid</SelectItem>
                <SelectItem value="dashed">Dashed</SelectItem>
                <SelectItem value="dotted">Dotted</SelectItem>
                <SelectItem value="double">Double</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Border Color */}
          <div>
            <Label htmlFor="borderColor">Border Color</Label>
            <Input
              id="borderColor"
              type="color"
              value={props.borderColor || "#000000"}
              onChange={(e) => setProp((props: ContainerBlockProps) => props.borderColor = e.target.value)}
            />
          </div>
          
          {/* Border Radius */}
          <div>
            <Label htmlFor="borderRadius">Border Radius (px)</Label>
            <Input
              id="borderRadius"
              type="number"
              value={props.borderRadius || 0}
              onChange={(e) => setProp((props: ContainerBlockProps) => props.borderRadius = parseInt(e.target.value))}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="effects" className="space-y-4">
          {/* Animation */}
          <div>
            <Label htmlFor="animation">Animation</Label>
            <Select
              value={props.animation || "none"}
              onValueChange={(value) => setProp((props: ContainerBlockProps) => props.animation = value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="fadeIn">Fade In</SelectItem>
                <SelectItem value="slideIn">Slide In</SelectItem>
                <SelectItem value="zoom">Zoom</SelectItem>
                <SelectItem value="bounce">Bounce</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Animation Duration */}
          <div>
            <Label htmlFor="animationDuration">Animation Duration (ms)</Label>
            <Input
              id="animationDuration"
              type="number"
              value={props.animationDuration || 300}
              onChange={(e) => setProp((props: ContainerBlockProps) => props.animationDuration = parseInt(e.target.value))}
            />
          </div>
          
          {/* Animation Delay */}
          <div>
            <Label htmlFor="animationDelay">Animation Delay (ms)</Label>
            <Input
              id="animationDelay"
              type="number"
              value={props.animationDelay || 0}
              onChange={(e) => setProp((props: ContainerBlockProps) => props.animationDelay = parseInt(e.target.value))}
            />
          </div>
          
          {/* Hover Background */}
          <div>
            <Label htmlFor="hoverBackground">Hover Background Color</Label>
            <Input
              id="hoverBackground"
              type="color"
              value={props.hoverBackground || ""}
              onChange={(e) => setProp((props: ContainerBlockProps) => props.hoverBackground = e.target.value)}
            />
          </div>
          
          {/* Hover Border Color */}
          <div>
            <Label htmlFor="hoverBorderColor">Hover Border Color</Label>
            <Input
              id="hoverBorderColor"
              type="color"
              value={props.hoverBorderColor || ""}
              onChange={(e) => setProp((props: ContainerBlockProps) => props.hoverBorderColor = e.target.value)}
            />
          </div>
          
          {/* Hover Transform */}
          <div>
            <Label htmlFor="hoverTransform">Hover Transform</Label>
            <Select
              value={props.hoverTransform || "none"}
              onValueChange={(value) => setProp((props: ContainerBlockProps) => props.hoverTransform = value === "none" ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="scale(1.05)">Scale Up</SelectItem>
                <SelectItem value="scale(0.95)">Scale Down</SelectItem>
                <SelectItem value="translateY(-2px)">Move Up</SelectItem>
                <SelectItem value="rotate(1deg)">Rotate Slightly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

(ContainerBlock as any).craft = {
  props: {
    columns: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    background: "#ffffff",
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: "#000000",
    borderRadius: 0,
    animation: 'none',
    animationDuration: 300,
    animationDelay: 0,
    displayType: 'block',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 0
  },
  related: {
    settings: ContainerBlockSettings
  }
};