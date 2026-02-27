<?php

namespace App\Entity;

use App\Repository\UsModuleRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity(repositoryClass: UsModuleRepository::class)]
class UsModule
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $icon = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $route = null;

    #[ORM\Column(nullable: true)]
    private ?int $position = null;

    #[ORM\Column(nullable: true)]
    private ?bool $isActive = false;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $className = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $idTag = null;

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'children')]
    #[ORM\JoinColumn(nullable: true)]
    private ?self $parent = null;

    #[ORM\OneToMany(mappedBy: 'parent', targetEntity: self::class)]
    private Collection $children;

    #[ORM\OneToMany(mappedBy: 'module', targetEntity: UsAction::class)]
    private Collection $actions;
    
    public function __construct()
    {
        $this->children = new ArrayCollection();
        $this->actions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function setIcon(?string $icon): static
    {
        $this->icon = $icon;

        return $this;
    }

    public function getRoute(): ?string
    {
        return $this->route;
    }

    public function setRoute(?string $route): static
    {
        $this->route = $route;

        return $this;
    }

    public function getPosition(): ?int
    {
        return $this->position;
    }

    public function setPosition(?int $position): static
    {
        $this->position = $position;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(?bool $isActive): static
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function getClassName(): ?string
    {
        return $this->className;
    }

    public function setClassName(?string $className): static
    {
        $this->className = $className;

        return $this;
    }

    public function getIdTag(): ?string
    {
        return $this->idTag;
    }

    public function setIdTag(?string $idTag): static
    {
        $this->idTag = $idTag;

        return $this;
    }

    public function getParent(): ?self
    {
        return $this->parent;
    }

    public function setParent(?self $parent): static
    {
        $this->parent = $parent;
        return $this;
    }

    public function getChildren(): Collection
    {
        return $this->children;
    }

    public function getActions(): Collection
    {
        return $this->actions;
    }
}
